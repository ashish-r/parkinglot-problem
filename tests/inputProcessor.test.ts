import inputProcessor from '../src/inputProcessor'
import { INPUTS } from '../src/utils/constants'

describe('Failure Cases', () => {
    test('when parking lot not initialised', () => {
        expect(inputProcessor(INPUTS.leave)).toBe('Crate parking lot first')
        expect(inputProcessor(INPUTS.park)).toBe('Crate parking lot first')
        expect(
            inputProcessor(INPUTS.registration_numbers_for_cars_with_colour)
        ).toBe('Crate parking lot first')
        expect(inputProcessor(INPUTS.slot_number_for_registration_number)).toBe(
            'Crate parking lot first'
        )
        expect(inputProcessor(INPUTS.slot_numbers_for_cars_with_colour)).toBe(
            'Crate parking lot first'
        )
        expect(inputProcessor(INPUTS.status)).toBe('Crate parking lot first')
    })
    test('wrong initialisation parking lot', () => {
        expect(inputProcessor(INPUTS.create_parking_lot + ' 0')).toBe(
            'Provide valid slots'
        )
        expect(inputProcessor('')).toBe('Invalid input')
    })
    test('incorrect params passed', () => {
        inputProcessor(INPUTS.create_parking_lot + ' 2')
        expect(inputProcessor(INPUTS.leave)).toBe('Provide correct lot detail')
        expect(inputProcessor(INPUTS.park)).toBe('Provide Correct Car Details')
        expect(
            inputProcessor(INPUTS.registration_numbers_for_cars_with_colour)
        ).toBe('Not found')
        expect(inputProcessor(INPUTS.slot_number_for_registration_number)).toBe(
            'Provide correct registration number'
        )
        expect(inputProcessor(INPUTS.slot_numbers_for_cars_with_colour)).toBe(
            'Not found'
        )
    })
})

describe('Empty Parking Lot', () => {
    test('create parking lot', () => {
        expect(inputProcessor(INPUTS.create_parking_lot + ' 1')).toBe(
            'Created a parking lot with 1 slot'
        )
    })
    test('park cars', () => {
        inputProcessor(INPUTS.create_parking_lot + ' 2')
        expect(inputProcessor(INPUTS.park + ' MH-02-AX123 White')).toBe(
            'Allocated slot number: 1'
        )
    })
    test('leave cars', () => {
        inputProcessor(INPUTS.create_parking_lot + ' 2')
        expect(inputProcessor(INPUTS.leave + ' 2')).toBe(
            'Provide correct lot detail'
        )
    })
    test('get details', () => {
        inputProcessor(INPUTS.create_parking_lot + ' 2')
        expect(
            inputProcessor(
                INPUTS.registration_numbers_for_cars_with_colour + ' white'
            )
        ).toBe('Not found')
        expect(
            inputProcessor(
                INPUTS.slot_number_for_registration_number + ' random'
            )
        ).toBe('Not found')
        expect(
            inputProcessor(INPUTS.slot_numbers_for_cars_with_colour + ' white')
        ).toBe('Not found')
        expect(inputProcessor(INPUTS.status)).toBe('No cars parked')
    })
})

describe('Full Parking Lot', () => {
    test('create parking lot', () => {
        expect(inputProcessor(INPUTS.create_parking_lot + ' 3')).toBe(
            'Created a parking lot with 3 slots'
        )
    })
    test('park cars', () => {
        expect(inputProcessor(INPUTS.park + ' MH-02-AX123 White')).toBe(
            'Allocated slot number: 1'
        )
        expect(inputProcessor(INPUTS.park + ' MH-02-AX124 White')).toBe(
            'Allocated slot number: 2'
        )
        expect(inputProcessor(INPUTS.park + ' MH-02-AX125 Red')).toBe(
            'Allocated slot number: 3'
        )
        expect(inputProcessor(INPUTS.park + ' MH-02-AX126 Red')).toBe(
            'Sorry, parking lot is full'
        )
    })
    test('leave cars', () => {
        expect(inputProcessor(INPUTS.leave + ' 3')).toBe(
            'Slot number 3 is free'
        )
    })
    test('get details', () => {
        expect(
            inputProcessor(
                INPUTS.registration_numbers_for_cars_with_colour + ' White'
            )
        ).toBe('MH-02-AX123, MH-02-AX124')
        expect(
            inputProcessor(
                INPUTS.slot_number_for_registration_number + ' MH-02-AX124'
            )
        ).toBe('2')
        expect(
            inputProcessor(INPUTS.slot_numbers_for_cars_with_colour + ' White')
        ).toBe('1, 2')
        expect(inputProcessor(INPUTS.status)).not.toBe('No cars parked')
    })
})
