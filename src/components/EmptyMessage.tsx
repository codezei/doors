

interface IEmptyMessageProps {
    message: string
}

const EmptyMessage:React.FC<IEmptyMessageProps> = ({message})=>{
    return <div className="py-5 text-center">
        <h3>{message}</h3>
    </div>
}

export default EmptyMessage