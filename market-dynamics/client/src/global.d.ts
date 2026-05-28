type Query = {
    externalityQuery: string
    market_structure: 'perfect competition' | 'monopolistic competition' | 'monopoly' | 'oligopoly'
    company_focus?: string
}
type Response = {
    extType: 'no_effect' | 'positive' | 'negative'
    effect: 'no_effect' | 'minor' | 'medium' | 'major' | 'catastrophic'
}

type ElastGraphProps = {
    maxPrice: number,
    maxQuantity: number,
    demandElasticity: number
    supplyElasticity: number
    priceLevel: number
}

type ElastVisIndicatorsProps = {
    priceDeviation: number | undefined
    equilibriumPrice: number | undefined
    equilibriumQuantity: number | undefined
    quantityDemanded: number | undefined
    quantityDemandedDeviation: number | undefined
    quantitySupplied: number | undefined
    quantitySuppliedDeviation: number | undefined
    marketImbalance: number | undefined
}

type ExtsGraphProps = {
    type: 'positive' | 'negative'
    eside: 'consumption' | 'production'
    extval: number
}

type ExtsVisIndicatorsProps = {
    dwl: number | undefined
    equilibriumQuantity: number | undefined
    equilibriumPrice: number | undefined
    extValue: number | undefined // cost or benefit - thats why "value" is used 
}
