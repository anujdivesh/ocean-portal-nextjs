import { ClipLoader } from 'react-spinners'; 


export default function Loading() {
    // Or a custom loading skeleton component
    return <ClipLoader size={50} color="#3498db" loading={true} />
}