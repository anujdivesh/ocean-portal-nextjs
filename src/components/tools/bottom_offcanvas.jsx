'use client';
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { showoffCanvas, hideoffCanvas  } from '@/app/GlobalRedux/Features/offcanvas/offcanvasSlice';
import { useAppSelector, useAppDispatch } from '@/app/GlobalRedux/hooks';
import dynamic from 'next/dynamic';
import 'chart.js/auto';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

function BottomOffCanvas({isVisible}) {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Dataset',
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(hideoffCanvas())
      };
return(
    <Offcanvas show={isVisible} onHide={handleClose} placement="bottom" className="offcanvas-bottom" backdrop={false} scroll={true}>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Timeseries viewer</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
    <div style={{ width: '100%', height: '200px' }}>
            <Line data={data} options={{ maintainAspectRatio: false }} />
          </div>
    </Offcanvas.Body>
  </Offcanvas>
)
}
export default BottomOffCanvas;