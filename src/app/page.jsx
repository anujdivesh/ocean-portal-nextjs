import Image from "next/image";
import styles from "./page.module.css";
import { Container } from "react-bootstrap";
import dynamic from 'next/dynamic';
import '@/components/css/map.css'
const MainContainer = dynamic(() => import('@/components/tools/main_container'), {ssr: false})
export default function Home() {

  
  return (
   <MainContainer/>
  );
}
