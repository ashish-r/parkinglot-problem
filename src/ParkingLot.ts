import { ICar, IParkedVehicles } from "./interface/interfacePool";

export default class ParkingLot{
    private _totalSlots: number
    private _slots: Array<ICar> = []
    private _carInfo: IParkedVehicles = {}
    private _nextAvailableSlot: number | undefined = 0
    constructor(totalSlots: number){
        this._totalSlots = totalSlots
    }
    private getNextAvailableSlot(currentSlot: number): number | undefined{
        let nextSlot
        for(let i = currentSlot; i < this._totalSlots; i++){
            if(!this._slots[i]){
                nextSlot = i
            }
        }
        return nextSlot
    }
    public park(car: ICar): boolean {
        const availableSlot = this._nextAvailableSlot as number
        if(availableSlot === undefined){
            return false
        }
        this._carInfo[car.registrationNumber] = {
            colour: car.colour,
            slot: availableSlot
        }
        this._slots[availableSlot] = {...car}
        this._nextAvailableSlot = this.getNextAvailableSlot(availableSlot)
        return true
    }
    public getIsAvailableParking(): boolean{
        return this._nextAvailableSlot !== undefined
    }
    public leave(slot: number): boolean{
        if((slot > this._totalSlots) || !this._slots[slot]){
            return false
        }
        const carToLeve = this._slots[slot]
        this._nextAvailableSlot = (
                this._nextAvailableSlot === undefined || 
                slot < this._nextAvailableSlot
            ) ? 
            slot : 
            this._nextAvailableSlot
        return delete this._slots[slot] && delete this._carInfo[carToLeve.registrationNumber]
    }
}
