const Sid = {
  twse_index: '.1',
  tpex_index: '.2',
}

exports.Sid = Sid

const Market = {
  twse: 1,
  tpex: 2,
  tpex_emerging: 3,
  taifex: 4,
  twse_pub: 5,

}

exports.Market = Market

const FinancialStatementType = {
  none: 0,
  individual: 1,
  consolidation: 2,

}

exports.FinancialStatementType = FinancialStatementType

const BuySellType = {
  none: 0,
  buy: 1,
  sell: 2,

}

exports.BuySellType = BuySellType

const DividendType = {
  cash: 1,
  stock: 2,
  cash_stock: 3,

}

exports.DividendType = DividendType

const ChgDir = {
  rise: 1,
  fall: 2,
  unch: 3,
  no_comp: 4,

}

exports.ChgDir = ChgDir

const Sector = {
  none: 0,
  cement: 1,
  food: 2,
  plastic: 3,
  textile: 4,
  electric_machinery: 5,
  electrical_cable: 6,
  chemical_biotech_medical_care: 7,
  chemical: 8,
  biotech_medical_care: 9,
  glass_ceramics: 10,
  paper_pulp: 11,
  iron_steel: 12,
  rubber: 13,
  automobile: 14,
  electronics: 15,
  semiconductor: 16,
  computer_peripheral_equipment: 17,
  optoelectronic: 18,
  communications_internet: 19,
  electronic_parts_components: 20,
  electronic_products_distribution: 21,
  information_service: 22,
  other_electronic: 23,
  building_material_construction: 24,
  shipping_transportation: 25,
  tourism: 26,
  finance_insurance: 27,
  trading_consumers_goods: 28,
  oil_gas_electricity: 29,
  other: 30,
  cultural_creative: 31,
  online_game: 32,
  cement_ceramic: 33,
  conglomerates: 34,
  depository_receipt: 35,
  management_stock: 36,
  future: 37,
  security: 38,
  index: 301,

}

exports.Sector = Sector

const SecurityType = {
  stock: 1,
  preferred_stock: 2,
  attach_stock: 3,
  management_stock: 4,
  tdr: 5,
  abs: 6,
  reit: 7,
  reat: 8,
  warrant: 101,
  etf: 102,
  fund: 103,
  cob: 201,
  conv_cob: 202,
  exchg_cob: 203,
  fc_cob: 204,
  gb: 205,
  tfb: 206,
  bkd: 207,
  index: 301,

}

exports.SecurityType = SecurityType
