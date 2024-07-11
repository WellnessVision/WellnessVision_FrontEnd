import NU_ViewPhysicalEvents from "./NU_components/NU_ViewPhysicalEvents"

const NU_ViewBookedPhysicalEvents: React.FC = () => {
    return(
        <div>
            <NU_ViewPhysicalEvents category="Booked"/>
        </div>
    )
    
}

export default NU_ViewBookedPhysicalEvents;