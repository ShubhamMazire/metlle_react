import React from 'react'

const Footer = () => {
  return (
    <div
    style={{
      backgroundImage: `url("/images/Footerimg.png")`,
      backgroundSize:"cover",
      backgroundPosition: 'center',
      height: '50vh',
      display: 'flex',
      justifyContent: "center",
      alignItems: "self-start"
    }}
  >
    <div
      className="container"
      style={{
        color:"whitesmoke",
        textAlign:"center",
        maxWidth: '800px',
        marginTop:"80px"
      }}
    >
      <h1
            style={{
              fontWeight: "bold",
              fontSize: "300%",
              marginBottom: "50px",
            }}
          >
            we are in the business of creating
            <br />
            a legacy
          </h1>
          
         
    </div>
  </div>
  )
}

export default Footer