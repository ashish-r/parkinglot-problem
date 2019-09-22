
export interface ICar {
    registrationNumber: string
    colour: string
}

export interface IParkedVehicles {
    [key: string]: {
        colour: string
        slot: number
    }
}