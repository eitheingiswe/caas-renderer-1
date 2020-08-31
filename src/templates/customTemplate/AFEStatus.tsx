import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";
import * as constants from "./constants";

const AFEExpiring = styled.div`
  font-weight: 700;
  color: ${constants.colorYellow};
  
`;
const AFEExpired = styled.div`
  font-size: 0.8em;
  border-radius: 2px;
  padding: 2px 8px;
  display: inline-block;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.02em;
  font-weight: 800;
  color: ${constants.colorMaroon};
  
`;
const AFEValid = styled.div`
  font-weight: 700;
  color: #fff;
  
`;
interface AFEStatusProps {
  validDate: Date;
  expiryDate: Date;
  today?: Date;
}

export const AFEStatus: React.FunctionComponent<AFEStatusProps> = ({ validDate, expiryDate, today = new Date() }) => {
  const expiryDateYear = expiryDate.getFullYear();
  const expiryDateMonth = expiryDate.getMonth();
  const expiryDateDay = expiryDate.getDay();
  const expiringDate = new Date(expiryDateYear, expiryDateMonth - 3, expiryDateDay);

  if (today > validDate){
    if (today > expiryDate) {
      return null;
    } else if (today > expiringDate) {
      return <AFEExpiring>Authorised Flight Examiner</AFEExpiring>;
    } else {
      return <AFEValid>Authorised Flight Examiner</AFEValid>;
    }
  }
  else{
    return null;
  }
};