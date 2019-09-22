import { ICar} from "./interface/interfacePool";

export default class ParkingLot{
    private _totalSlots: number
    private _slots: Array<ICar> = []
    private _carsRegSlot: {[registrationNumber: string]: number} = {}
    private _carsColourSlot: {[colour: string]: Array<number>} = {}
    private _nextAvailableSlot: number | undefined = 0
    constructor(totalSlots: number){
        this._totalSlots = totalSlots
    }
    private getNextAvailableSlot(currentSlot: number): number | undefined{
        for(let i = currentSlot; i < this._totalSlots; i++){
            if(!this._slots[i]){
                return i
            }
        }
    }
    public park(car: ICar): number | void {
        const availableSlot = this._nextAvailableSlot as number
        if(availableSlot === undefined){
            return
        }
        this._carsRegSlot[car.registrationNumber] = availableSlot
        this._slots[availableSlot] = {...car}
        this._carsColourSlot[car.colour] = [availableSlot, ...(this._carsColourSlot[car.colour] || [])]
        this._nextAvailableSlot = this.getNextAvailableSlot(availableSlot)
        return availableSlot
    }
    public getIsAvailableParking(): boolean{
        return this._nextAvailableSlot !== undefined
    }
    public leave(slot: number): boolean{
        if((slot > this._totalSlots) || !this._slots[slot]){
            return false
        }
        const carToLeve = this._slots[slot]
        this._carsColourSlot[carToLeve.colour] = this._carsColourSlot[carToLeve.colour].filter(
                x => x!== slot
            )
        this._nextAvailableSlot = (
                this._nextAvailableSlot === undefined || 
                slot < this._nextAvailableSlot
            ) ? 
            slot : 
            this._nextAvailableSlot
        return delete this._slots[slot] && delete this._carsRegSlot[carToLeve.registrationNumber]
    }
    public getAllParkedCars(){
        return Object.values(this._carsRegSlot).map(
            (slot) => ({slot, ...this._slots[slot]})
        )
    }
    public getCarSlotForRegistrationNumber(regNo: string): number | void {
        return this._carsRegSlot[regNo]
    }
    public getCarsSlotBasedOnColour(colour: string): number[] | void{
        return this._carsColourSlot[colour]
    }
}
