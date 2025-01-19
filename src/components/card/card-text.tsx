import React from "react";
import tapLogo from "../../assets/tap-logo.svg";

const CardText = ({
  oracleText
}: { oracleText?: string }) => {

  if (!oracleText) {
    return (
      <></>
    )
  }

  const parts = oracleText.split(/{T}/);

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <img
              src={tapLogo}
              alt="Tap Symbol"
              style={{ width: '19px', height: '19px' }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default CardText