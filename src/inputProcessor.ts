import { INPUTS } from './utils/constants'
import ParkingLot from './ParkingLot'
import { gridStringFromArrayOfObjects } from './utils/commonMethods'

let PARKING_LOT: ParkingLot

export default function inputProcessor(input: string): string {
    const params = input.split(' ')
    switch (params[0]) {
        case INPUTS.create_parking_lot:
            return createParkingLot(+params[1])
        case INPUTS.park:
            return park(params[1], params[2])
        case INPUTS.leave:
            return leave(+params[1])
        case INPUTS.status:
            return allParkedCars()
        case INPUTS.registration_numbers_for_cars_with_colour:
            return registrationNumbersForColour(params[1])
        case INPUTS.slot_number_for_registration_number:
            return slotNumberForRegNo(params[1])
        case INPUTS.slot_numbers_for_cars_with_colour:
            return slotNumbersForColour(params[1])
        default:
            return 'Invalid input'
    }
}

function createParkingLot(slots: number): string {
    if (slots) {
        PARKING_LOT = new ParkingLot(slots)
        return `Created a parking lot with ${slots} ${
            slots === 1 ? 'slot' : 'slots'
        }`
    }
    return 'Provide valid slots'
}

function park(registrationNumber?: string, colour?: string): string {
    if (!PARKING_LOT) {
        return 'Crate parking lot first'
    }
    if (!registrationNumber || !colour) {
        return 'Provide Correct Car Details'
    }
    const slot =
        PARKING_LOT.getIsAvailableParking() &&
        PARKING_LOT.park({
            registrationNumber,
            colour,
        })
    if (slot === false || slot === undefined) {
        return 'Sorry, parking lot is full'
    }
    return `Allocated slot number: ${slot + 1}`
}

function leave(leaveSlot: number): string {
    if (!PARKING_LOT) {
        return 'Crate parking lot first'
    }
    if (!(leaveSlot && PARKING_LOT.leave(leaveSlot - 1))) {
        return 'Provide correct lot detail'
    }
    return `Slot number ${leaveSlot} is free`
}

function slotNumberForRegNo(regNo?: string): string {
    if (!PARKING_LOT) {
        return 'Crate parking lot first'
    }
    if (!regNo) {
        return 'Provide correct registration number'
    }
    const slotNumber = PARKING_LOT.getCarSlotForRegistrationNumber(regNo)
    if (slotNumber === undefined) {
        return 'Not found'
    } else {
        return `${slotNumber + 1}`
    }
}

function slotNumbersForColour(colour?: string): string {
    if (!PARKING_LOT) {
        return 'Crate parking lot first'
    }
    const slotNumbers = colour && PARKING_LOT.getCarsSlotBasedOnColour(colour)
    if (slotNumbers && slotNumbers.length) {
        return slotNumbers.map(x => x + 1).join(', ')
    }
    return 'Not found'
}

function registrationNumbersForColour(colour?: string): string {
    if (!PARKING_LOT) {
        return 'Crate parking lot first'
    }
    const registrationNumbers =
        colour && PARKING_LOT.getRegNosBasedOnColour(colour)
    if (registrationNumbers && registrationNumbers.length) {
        return registrationNumbers.join(', ')
    }
    return 'Not found'
}

function allParkedCars() {
    if (!PARKING_LOT) {
        return 'Crate parking lot first'
    }
    const allParkedCars = PARKING_LOT.getAllParkedCars()
    if (allParkedCars.length) {
        return gridStringFromArrayOfObjects(allParkedCars)
    }
    return 'No cars parked'
}
