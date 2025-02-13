import React from 'react'

function WelcomeScreen() {
  return (
    <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: 'column',
        backgroundColor:'white'
    }}>
        <div style={{width:'100%',border:'1px solid black',padding:20}}>
<p>

        Welcome to the Expense Tracker

        </p>
        </div>
        
        </div>
  )
}

export default WelcomeScreen