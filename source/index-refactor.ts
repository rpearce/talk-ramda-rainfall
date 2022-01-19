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

// == Refactor #1 ==

const januariesSum =
  rows
    .map(row => row?.JAN ?? '0')
    .map(Number)
    .reduce((acc, x) => acc + x, 0)

const januaryAvgMm        = januariesSum / rows.length
const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

console.log(`January Average: ${januaryAvgMmRounded}mm`)

// == Refactor #2 ==

//interface GetJan {
//  (row: Row): Row[keyof Row]
//}

//const getJan: GetJan = row => row?.JAN ?? '0'

//const januariesSum =
//  rows
//    .map(getJan)
//    .map(Number)
//    .reduce((acc, x) => acc + x, 0)

//const januaryAvgMm        = januariesSum / rows.length
//const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

//console.log(`January Average: ${januaryAvgMmRounded}mm`)


// == Refactor #3 ==

//interface Compose {
//  <A, B, C>(
//    f: (x: B) => C,
//    g: (x: A) => B,
//  ): (x: A) => C
//}

//const compose: Compose = (f, g) => (x) => f(g(x))

//interface GetJan {
//  (row: Row): Row[keyof Row]
//}

//const getJan: GetJan = row => row?.JAN ?? '0'
//const getJanNum      = compose(Number, getJan)

//const januariesSum =
//  rows
//    .map(getJanNum)
//    .reduce((acc, x) => acc + x, 0)

//const januaryAvgMm        = januariesSum / rows.length
//const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

//console.log(`January Average: ${januaryAvgMmRounded}mm`)


// == Refactor #4 ==

//interface Compose {
//  <A, B, C>(
//    f: (x: B) => C,
//    g: (x: A) => B,
//  ): (x: A) => C
//}

//const compose: Compose = (f, g) => (x) => f(g(x))

//interface GetPropOr {
//  <A>(fallback: A):
//  <B>(property: keyof B)
//  => (data: B)
//  => B[keyof B] | A
//}

//const getPropOr: GetPropOr = fallback => property => data => {
//  if (data instanceof Object) {
//    return data[property]
//  } else {
//    return fallback
//  }
//}

//interface GetJan {
//  (row: Row): Row[keyof Row]
//}

//const getJan: GetJan = getPropOr('0')('JAN')
//const getJanNum      = compose(Number, getJan)

//const januariesSum =
//  rows
//    .map(getJanNum)
//    .reduce((acc, x) => acc + x, 0)

//const januaryAvgMm        = januariesSum / rows.length
//const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

//console.log(`January Average: ${januaryAvgMmRounded}mm`)

// == Refactor #5 ==

//interface Compose {
//  <A, B, C>(
//    f: (x: B) => C,
//    g: (x: A) => B,
//  ): (x: A) => C
//}

//const compose: Compose = (f, g) => (x) => f(g(x))

//interface GetPropOr {
//  <A>(fallback: A):
//  <B>(property: keyof B)
//  => (data: B)
//  => B[keyof B] | A
//}

//const getPropOr: GetPropOr = fallback => property => data => {
//  if (data instanceof Object) {
//    return data[property]
//  } else {
//    return fallback
//  }
//}

//interface Map {
//  <A, B>
//    (fn: (value: A, index: number, array: A[]) => B):
//    (array: A[])
// => B[]
//}

//const map: Map = fn => arr => {
//  const newArr = []

//  for (let i = 0; i < arr.length; i++) {
//    newArr.push(fn(arr[i], i, arr))
//  }

//  return newArr
//}

//interface Reduce {
//  <A, B>(
//    fn: (prevVal: B, curVal: A, curIndex: number, array: A[]) => B,
//    initialValue: B
//  ): (arr: A[]) => B
//}

//const reduce: Reduce = (fn, initialValue) => arr => {
//  let acc = initialValue

//  for (var i = 0; i < arr.length; i++) {
//    acc = fn(acc, arr[i], i, arr)
//  }

//  return acc
//}

//interface Sum {
//  (xs: number[]): number
//}

//const sum: Sum = reduce<number, number>((acc, x) => acc + x, 0)

//interface GetJan {
//  (row: Row): Row[keyof Row]
//}

//const getJan: GetJan      = getPropOr('0')('JAN')
//const getJanNum           = compose(Number, getJan)
//const getJanuariesSum     = compose(sum, map(getJanNum))

//const januaryAvgMm        = getJanuariesSum(rows) / rows.length
//const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

//console.log(`January Average: ${januaryAvgMmRounded}mm`)


// == Refactor #6 ==

//import { compose, map, propOr, sum } from 'ramda'

//const getJan              = propOr('0', 'JAN')
//const getJanNum           = compose(Number, getJan)
//const getJanuariesSum     = compose(sum, map(getJanNum))

//const januaryAvgMm        = getJanuariesSum(rows) / rows.length
//const januaryAvgMmRounded = januaryAvgMm.toFixed(2)

//console.log(`January Average: ${januaryAvgMmRounded}mm`)

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
