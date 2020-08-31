import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { CustomTemplateCertificate, Rating } from "../sample";
import { LabelStatus } from "./LabelStatus";
import { AFEStatus } from "./AFEStatus";
import * as constants from "./constants";

const flexColumnCenter = `
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FieldGroup = styled.div<{ isFront: boolean }>`
  border: 0;
  border-left: 2px solid ${constants.colorWhite};
  padding-left: ${({ isFront }) => (isFront ? "15px" : "5px")};
  margin-bottom: ${({ isFront }) => (isFront ? "10px" : "5px")};
`;

const RatingGroup = styled.div`
  font-size: 0.6em;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RatingGroupDetails = styled.div`
  display: flex;
`;

const RatingName = styled.div`
  font-weight: 700;
  margin-bottom: 5px;
  width: 65%;
`;

const LabelText = styled.div`
  font-size: 0.6em;
`;

const LabelValue = styled.div`
  font-size: 0.7em;
  font-weight: 600;
`;

const Profile = styled.div`
  ${flexColumnCenter}
  height: 47%;
  background: url(${constants.bgMap}) center;
`;

const LicenseName = styled.div`
  display: flex;
  padding: 0px 40px 0px 40px;
  font-size: 0.7em;
  text-align: center;
  font-weight: 800;
  color: ${constants.colorBlueDark};
`;

const ProfileContent = styled.div`
  display: flex;
  margin-left: 55%;
  margin-right: 20px;
  margin-top: 5px;
`;

const ProfileShot = styled.div`
  ${flexColumnCenter}
  align-items: center;
  background-color: ${constants.colorWhite};
  flex-shrink: 0;
  height: 125px;
  width: 100px;
  overflow: hidden;
`;

const LicenseDetails = styled.div`
  ${flexColumnCenter}
  height: 53%;
  background-color: ${constants.colorBlueDark};
`;

const LicenseDetailContent = styled.div`
  display: flex;
  height: 100%;  
`;

const LicenseDetailsBar = styled.div`
  background-color: ${constants.colorBlueDark2};
  height: 100%;
  width: 35px;
  text-align: left;
  padding: 20px 3px;
`;

const LabelValueBar = styled.div`
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 4px;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
`;

const LicenseDetailsText = styled.div`
  flex: 1 1 0%;
  background-color: ${constants.colorBlueDark};
  padding: 10px;
`;

const ButtonFlip = styled.button`
  appearance: none;
  outline: none;
  border: 0;
  padding: 0;
  top: calc(${constants.cardH} - 60px);
  left: 80%;
  position: absolute;  
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${constants.colorMaroon};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
	box-shadow: 2px 2px 4px #000;

  &:focus {
    outline: none;
  }
`;

const LicenseInfo = styled.div`
  display: flex;
  padding: 20px 20px;
  font-size: 0.7em;
  text-align: center;
  font-weight: 700;
  color: ${constants.colorBlueDark};
`;

const LicenseRatings = styled.div`
  padding: 15px 20px;
  background-color: ${constants.colorBlueDark};
  min-height: 55%;
`;

const Scene = styled.div`
  width: 100%;
  margin-top: 2rem;
  perspective: 1000;
`;

const FlipCard = styled.div<{ isFlipped: boolean }>`
  transition: transform 0.7s ${constants.easeOutCubic};
  transform: rotateY(${({ isFlipped }) => (isFlipped ? "-180deg" : "0deg")});
  position: relative;
  transform-style: preserve-3d;
  width: ${constants.cardW};
  height: ${constants.cardH};
  margin-left: auto;
  margin-right: auto;
  color: ${constants.colorWhite};
  cursor: pointer;
`;

const FlipCardFace = styled.div<{ isFront: boolean }>`
  transform: rotateY(${({ isFront }) => (isFront ? "0deg" : "-180deg")});
  backface-visibility: hidden;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${constants.colorBlue};
  border-radius: 15px;
  overflow: hidden;
`;

interface RatingsProps {
  ratings: Rating[];
}

const Ratings: FunctionComponent<RatingsProps> = ({ ratings }: { ratings: Rating[] }) => {
  const rendererdRatings = ratings.map((rating, index) => (
    <RatingGroup key={index}>

      <RatingGroupDetails>
        <RatingName>{rating.name}<AFEStatus validDate={new Date(rating.AFEValidityStartDate)} expiryDate={new Date(rating.AFEexpiryDate)}/></RatingName>      
        <LabelStatus expiryDate={new Date(rating.expiryDate)}/>
      </RatingGroupDetails> 

      <RatingGroupDetails>
        <FieldGroup isFront={false} style={{ flex: 2 }}>
          <div>Limitations:</div>
          <div>{rating.limitations || "NIL"}</div>
        </FieldGroup>
        <FieldGroup isFront={false} style={{ flex: 1 }}>
          <div>Valid Till:</div>
          <div>{format(new Date(rating.expiryDate), "dd MMM yyyy")}</div>
        </FieldGroup>
      </RatingGroupDetails>
    </RatingGroup>
  ));
  return <>{rendererdRatings}</>;
};

export const CustomTemplate: FunctionComponent<TemplateProps<CustomTemplateCertificate>> = ({ document }) => {
  const [isFlipped, setFlip] = useState(false);

  const onClickFlipCard = () => {
    setFlip(!isFlipped);
  };
  return (
    <Scene>
      <FlipCard isFlipped={isFlipped} onClick={onClickFlipCard}>
        <FlipCardFace isFront={true}>
          <Profile>
            <LicenseName className="text-uppercase">
              {document.name}
            </LicenseName>
            <ProfileContent>
              <ProfileShot>
                <img style={{width: 100, height: 128.5}} src={document.recipient.photo} />
              </ProfileShot>
            </ProfileContent>
          </Profile>
          <LicenseDetails>
            <LicenseDetailContent>
              <LicenseDetailsBar>
                <LabelValueBar>{document.id}</LabelValueBar>
              </LicenseDetailsBar>
              <LicenseDetailsText>
                <FieldGroup isFront={true}>
                  <LabelText>Name of Pilot:</LabelText>
                  <LabelValue>{document.recipient.name}</LabelValue>
                </FieldGroup>
                <FieldGroup isFront={true}>
                  <LabelText>Date of Birth:</LabelText>
                  <LabelValue>{format(new Date(document.recipient.dob), "dd MMM yyyy")}</LabelValue>
                </FieldGroup>
                <FieldGroup isFront={true}>
                  <LabelText>Date of Issue:</LabelText>
                  <LabelValue>{format(new Date(document.issuanceDate), "dd MMM yyyy")}</LabelValue>
                </FieldGroup>
                <FieldGroup isFront={true}>
                  <LabelText>Issuing Authority:</LabelText>
                  <LabelValue>Civil Aviation Authority of Singapore</LabelValue>
                </FieldGroup>
              </LicenseDetailsText>              
              <ButtonFlip onClick={onClickFlipCard}>
                <svg         
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 287 372" 
                  width="24"
                  height="24">
                  <defs>
                    <image width="274" height="364" id="img1" href={constants.phoneIcon}/>
                  </defs>
                  <use id="Layer 4" href="#img1" x="5" y="7"/>
                </svg>
              </ButtonFlip>
            </LicenseDetailContent>            
          </LicenseDetails>
        </FlipCardFace>
        <FlipCardFace isFront={false}>
          <LicenseInfo>
          THIS PILOT IS ENTITLED TO EXERCISE THE PRIVILEGES IN CONJUNCTION WITH THE CLASS, CATEGORY AND RATING SHOWN BELOW:
          </LicenseInfo>
          <LicenseRatings>
            <Ratings ratings={document.ratings} />
          </LicenseRatings>
          <ButtonFlip onClick={onClickFlipCard}>                
            <svg
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 287 372" 
              width="24"
              height="24">
              <defs>
                <image width="274" height="364" id="img1" href={constants.phoneIcon}/>
              </defs>
              <use id="Layer 4" href="#img1" x="5" y="7"/>
            </svg>
          </ButtonFlip>
        </FlipCardFace>
      </FlipCard>
    </Scene>
  );
};
