import { gridStringFromArrayOfObjects } from '../../src/utils/helpers'

describe('gridStringFromArrayOfObjects', () => {
    test('empty array', () => {
        expect(gridStringFromArrayOfObjects([])).toBe('')
    })
    test('array of objects', () => {
        expect(gridStringFromArrayOfObjects([{ a: 1, b: 2 }])).toBe(
            'a  b\n1    2'
        )
        expect(gridStringFromArrayOfObjects([{ a: 1, b: 2 }])).not.toBe('')
    })
})
