import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'no_key' }, { status: 200 })
  }

  try {
    const body = await req.json()
    const { ratedProducts, notes, skinType, concerns } = body

    const productLines = ratedProducts.map((p: {
      brand: string; name: string; shade: string | null; section: string; rating: string
    }) =>
      `- [${p.rating.toUpperCase()}] ${p.brand} ${p.name}${p.shade ? ` in ${p.shade}` : ''} (${p.section})`
    ).join('\n')

    const noteLines = Object.entries(notes as Record<string, string>).map(([id, note]) => {
      const product = ratedProducts.find((p: { id: string }) => p.id === id)
      return product ? `- ${product.brand} ${product.name}: "${note}"` : null
    }).filter(Boolean).join('\n')

    const prompt = `You are a personalized beauty advisor. Analyze this user's makeup bag and generate 5 insight cards that feel genuinely personal and specific to them — not generic tips.

THEIR BAG:
${productLines || 'No products rated yet.'}

${noteLines ? `THEIR NOTES:\n${noteLines}` : ''}

SKIN PROFILE:
- Skin type: ${skinType ?? 'not specified'}
- Concerns: ${concerns?.length ? concerns.join(', ') : 'none specified'}

Rules:
- Reference actual product names and brands they own
- Tone: warm, direct, like a knowledgeable friend — not clinical
- If they have notes, incorporate what they said into the insight
- If skin type/concerns are set, connect their products to those needs
- Find patterns across their ratings (e.g. they love dewy finishes, they gravitate to lips, they prefer clean brands)
- Mix types: aesthetic vibe, routine gap, skin match, brand pattern, what their notes reveal
- Title = punchy 1-liner (max 8 words), specific to them
- Body = 2-3 sentences, mention actual products by name

Return ONLY valid JSON:
{
  "insights": [
    {
      "tag": "2-3 word category",
      "title": "Punchy personal headline",
      "body": "2-3 sentences of specific insight."
    }
  ]
}`

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON in response')
    }

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)
  } catch (err) {
    console.error('Insights API error:', err)
    return NextResponse.json({ error: 'failed' }, { status: 500 })
  }
}
