import ParkingLot from "../src/ParkingLot";
import { ICar } from "../src/interface/interfacePool";

describe('when parking empty', () => {
    const parkingLot = new ParkingLot(2)
	test('park', () => {
        const carOne: ICar = {
            registrationNumber: 'KA-01-HH-1234',
            colour:  'White'
        }
        const carTwo: ICar = {
            registrationNumber: 'KA-01-HH-1235',
            colour:  'White'
        }
        expect(parkingLot.park(carOne)).toBe(0)
        expect(parkingLot.getIsAvailableParking()).toBe(true)
        expect(parkingLot.park(carTwo)).toBe(1)
        expect(parkingLot.getIsAvailableParking()).toBe(false)
	})
})

describe('when parking full', () => {
    const parkingLot = new ParkingLot(2)
    const carOne: ICar = {
        registrationNumber: 'KA-01-HH-1234',
        colour:  'White'
    }
    const carTwo: ICar = {
        registrationNumber: 'KA-01-HH-1235',
        colour:  'White'
    }
    parkingLot.park(carOne)
    parkingLot.park(carTwo)
	test('park', () => {
        const carThree: ICar = {
            registrationNumber: 'KA-01-HH-1234',
            colour:  'White'
        }
        expect(parkingLot.park(carThree)).toBeUndefined()
        expect(parkingLot.getIsAvailableParking()).toBe(false)
	})
})