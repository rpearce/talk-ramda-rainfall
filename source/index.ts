import { parse } from 'csv-parse/sync'
import fs from 'fs'

// =============================================================================
// Data setup

interface Row {
  Year: string
  JAN: string
  FEB: string
  MAR: string
  APR: string
  MAY: string
  JUN: string
  JUL: string
  AUG: string
  SEP: string
  OCT: string
  NOV: string
  DEC: string
  WIN: string
  SPR: string
  SUM: string
  AUT: string
  ANN: string
}

const csvData = fs.readFileSync('./source/wd.csv', { encoding: 'utf8' })
const rows = parse(csvData, { columns: true, skip_empty_lines: true }) as Row[]


// =============================================================================
console.log(`
##############
Since 1910...
##############
`)


// =============================================================================
// January average since 1910 (mm)

const januaries: number[] = []

rows.forEach(row => {
  januaries.push(Number(row.JAN))
})


let januariesSum = 0.0

januaries.forEach(jan => {
  januariesSum += jan
})

const januaryAvgMm        = januariesSum / januaries.length
const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

console.log(`January Average: ${januaryAvgMmRounded}mm`)


// =============================================================================
// Annual average since 1910 (mm)

const annuals: number[] = []

rows.forEach(row => {
  annuals.push(Number(row.ANN))
})


let annualsSum = 0.0

annuals.forEach(ann => {
  annualsSum += ann
})

const totalAvgMm        = annualsSum / annuals.length
const totalAvgMmRounded = totalAvgMm.toFixed(2)

console.log(`Total yearly average: ${totalAvgMmRounded}mm`)


// =============================================================================
// Volume of rainfall in the UK since 1910: (avg_rainfall(mm) / 1000000) * 242,495(km²)

const rainfallVolumeKmCubed        = (totalAvgMm / 1000000.0) * 242495
const rainfallVolumeKmCubedRounded = rainfallVolumeKmCubed.toFixed(2)

console.log(`Rainfall volume in UK: ${rainfallVolumeKmCubedRounded}km^3`)


// =============================================================================
// Olympic pool dimensions: 50m in length, 25m in width, 1m deep (50 * 25 * 1 = volume)

const poolVolumeKmCubed    = 1.25 ** -6
const numberOfPools        = rainfallVolumeKmCubed / poolVolumeKmCubed
const numberOfPoolsRounded = numberOfPools.toFixed(2)

console.log(`Number of olympic-sized pools of rain: ${numberOfPoolsRounded} pools`)


// =============================================================================
// Annual average as height of an average cat (23cm)

const catHeightMm       = 230
const catsRained        = totalAvgMm / catHeightMm
const catsRainedRounded = catsRained.toFixed(2)

console.log(`How deep is the UK in cats rained: ${catsRainedRounded} cats`)
