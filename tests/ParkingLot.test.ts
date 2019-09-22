import ParkingLot from '../src/ParkingLot'
import { ICar } from '../src/interface/interfacePool'

const carOne: ICar = {
    registrationNumber: 'KA-01-HH-1234',
    colour: 'White',
}
const carTwo: ICar = {
    registrationNumber: 'KA-01-HH-1235',
    colour: 'Red',
}
const carThree: ICar = {
    registrationNumber: 'KA-01-HH-1234',
    colour: 'White',
}

describe('when parking empty', () => {
    const parkingLot = new ParkingLot(2)
    test('getCarSlot', () => {
        expect(
            parkingLot.getCarSlotForRegistrationNumber('randomReg')
        ).toBeUndefined()
        expect(
            parkingLot.getCarsSlotBasedOnColour(carOne.colour)[0]
        ).toBeUndefined()
        expect(
            parkingLot.getRegNosBasedOnColour(carOne.colour)[0]
        ).toBeUndefined()
    })
    test('getAllParkedCars', () => {
        expect(parkingLot.getAllParkedCars().length).toBe(0)
    })
    test('park', () => {
        expect(parkingLot.getIsAvailableParking()).toBe(true)
        expect(parkingLot.park(carOne)).toBe(0)
        expect(parkingLot.getIsAvailableParking()).toBe(true)
        expect(parkingLot.park(carTwo)).toBe(1)
        expect(parkingLot.getIsAvailableParking()).toBe(false)
    })
    test('leave', () => {
        expect(parkingLot.leave(0)).toBe(true)
        expect(parkingLot.leave(1)).toBe(true)
        expect(parkingLot.park(carThree)).toBe(0)
    })
})

describe('when parking full', () => {
    const parkingLot = new ParkingLot(2)
    parkingLot.park(carOne)
    parkingLot.park(carTwo)
    test('getCarSlot', () => {
        expect(
            parkingLot.getCarSlotForRegistrationNumber(
                carOne.registrationNumber
            )
        ).toBe(0)
        expect(parkingLot.getCarsSlotBasedOnColour(carOne.colour)[0]).toBe(0)
        expect(parkingLot.getRegNosBasedOnColour(carOne.colour)[0]).toBe(
            carOne.registrationNumber
        )
    })
    test('getAllParkedCars', () => {
        expect(parkingLot.getAllParkedCars().length).toBe(2)
    })
    test('park', () => {
        expect(parkingLot.getIsAvailableParking()).toBe(false)
        expect(parkingLot.park(carThree)).toBeUndefined()
    })
    test('leave', () => {
        expect(parkingLot.leave(3)).toBe(false)
        expect(parkingLot.leave(1)).toBe(true)
        expect(parkingLot.park(carThree)).toBe(1)
    })
})
