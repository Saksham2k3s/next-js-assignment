"use client"
import { updateMode } from '@/lib/store/features/mode/modeSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import React from 'react'


function Home() {
  const dispatch = useAppDispatch()
  const { mode } = useAppSelector((state) => state.mode);

  const updateModeHandler = () => {
     dispatch(updateMode())
  }
  console.log("this is mode", mode);
  return (
    <>
    <button onClick={updateModeHandler} >Change Mode</button>
    <h2>{mode}</h2>
    </>
  )
}

export default Home