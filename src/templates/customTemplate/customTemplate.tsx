import React, { FunctionComponent, useState } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { format } from "date-fns";
import styled from "@emotion/styled";
import { CustomTemplateCertificate, Rating } from "../sample";
import { LabelStatus } from "./LabelStatus";
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
`;

const RatingHeading = styled.div`
  font-size: 0.7em;
  font-weight: 700;
  margin-bottom: 15px;
`;

const LabelText = styled.div`
  font-size: 0.6em;
`;

const LabelValue = styled.div`
  font-size: 0.8em;
  font-weight: 700;
`;

const Profile = styled.div`
  ${flexColumnCenter}
  height: 47%;
  background: url(${constants.bgMap}) center ;
`;

const LicenseName = styled.div`
  display: flex;
  padding: 10px 40px;
  font-size: 0.7em;
  text-align: center;
  font-weight: 700;
  color: ${constants.colorBlueDark};
`;

const ProfileContent = styled.div`
  display: flex;
  margin-left: 55%;
  margin-right: 20px;
  margin-top: 0px;
`;

// const ProfileAgency = styled.div`
//   ${flexColumnCenter}
//   flex: 1 1 0%;
//   padding: 20px;
// `;
//
const ProfileShot = styled.div`
  ${flexColumnCenter}
  align-items: center;
  background-color: ${constants.colorWhite};
  flex-shrink: 0;
  height: 100px;
  width: 80px;
  overflow: hidden;
`;

// const ProfileShot = styled.div`
//   flex: 1 1 0%;
//   padding: 0px;
//   background-color: ${constants.colorWhite};
//  `;


const LicenseDetails = styled.div`   
  ${flexColumnCenter}
  height: 53%;
  background-color: ${constants.colorBlueDark};
`;
//
const LicenseDetailContent = styled.div`
  display: flex;
  height: 100%;  
`;

const LicenseDetailsBar = styled.div`
  ${flexColumnCenter}
  background-color: ${constants.colorBlueDark2};
  height: 100%;
  width: 35px;
  text-align: left;
  padding-right: 5px;
`;

const LabelValueBar = styled.div`
  font-size: 1em;
  font-weight: 500;
  letter-spacing: 3px;
  writing-mode: vertical-lr; 
  transform: rotate(180deg);
`;
//text-transform: uppercase;

const LicenseDetailsText = styled.div`
  flex: 1 1 0%;
  background-color: ${constants.colorBlueDark};
  padding: 20px;
`;

//top: calc(${constants.cardH} + 10px);
//left: 50%;
//margin-left: -18px;
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
	box-shadow: 2px 2px 4px #999;

  &:focus {
    outline: none;
  }
`;

const ButtonFlipIcon = styled.svg<{ isFlipped: boolean }>`
  transition: transform 0.4s ${constants.easeInOutCubic};
  transform: rotateZ(${({ isFlipped }) => (isFlipped ? "0deg" : "-180deg")});
`;


const LicenseInfo = styled.div`
  display: flex;
  padding: 20px 20px;
  font-size: 0.7em;
  text-align: center;
  font-weight: 700;
  color: ${constants.colorBlueDark};
`;
//  ${flexColumnCenter}
const LicenseRatings = styled.div`
  padding: 15px 20px;
  background-color: ${constants.colorBlueDark};
  min-height: 55%;
`;

const Scene = styled.div`
  position: absolute;
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
      <RatingName>{rating.name}</RatingName>
      <LabelStatus expiryDate={new Date(rating.expiryDate)} />
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
      <FlipCard isFlipped={isFlipped}>
        <FlipCardFace isFront={true}>
          <Profile>
            <LicenseName className="text-uppercase">
              {document.name} (UAPL)
            </LicenseName>
            <ProfileContent>
              {/* <ProfileAgency>
                <img className="img-fluid" src="https://www.caas.gov.sg/assets/caas/images/logo-caas-white.png" />
              </ProfileAgency> */}
              <ProfileShot>
                <img style={{width: 100, height: 100}} src={document.recipient.photo} />
              </ProfileShot>
            </ProfileContent>
          </Profile>
          <LicenseDetails>
            <LicenseDetailContent>
              <LicenseDetailsBar>
                <LabelValueBar>{document.id}</LabelValueBar>
              </LicenseDetailsBar>
              <LicenseDetailsText>
                {/* <FieldGroup isFront={true}>
                  <LabelText>License Number:</LabelText>
                  <LabelValue>{document.id}</LabelValue>
                </FieldGroup> */}
                <FieldGroup isFront={true}>
                  <LabelText>Name of Pilot:</LabelText>
                  <LabelValue>{document.recipient.name}</LabelValue>
                </FieldGroup>
                <FieldGroup isFront={true}>
                  <LabelText>Birth Date:</LabelText>
                  <LabelValue>{format(new Date(document.recipient.dob), "dd MMM yyyy")}</LabelValue>
                </FieldGroup>
                <FieldGroup isFront={true}>
                  <LabelText>Issue Date:</LabelText>
                  <LabelValue>{format(new Date(document.issuanceDate), "dd MMM yyyy")}</LabelValue>
                </FieldGroup>
              </LicenseDetailsText>              
              <ButtonFlip onClick={onClickFlipCard}>
                <ButtonFlipIcon
                  isFlipped={isFlipped}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  // background-image = url(../img/Clock-Play.png);
                  background-size = "cover"
                  className="feather feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </ButtonFlipIcon>
              </ButtonFlip>
            </LicenseDetailContent>            
          </LicenseDetails>
        </FlipCardFace>
        <FlipCardFace isFront={false}>
          <LicenseInfo>
          THIS PILOT IS ENTITLED TO EXERCISE THE PRIVILEGES IN CONJUNCTION WITH THE CLASS, CATEGORY AND RATING SHOWN BELOW:
          </LicenseInfo>
          <LicenseRatings>
            <RatingHeading>UNMANNED AIRCRAFT RATING</RatingHeading>
            <Ratings ratings={document.ratings} />
          </LicenseRatings>
          <ButtonFlip onClick={onClickFlipCard}>
                <ButtonFlipIcon
                  isFlipped={isFlipped}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-arrow-left"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </ButtonFlipIcon>
              </ButtonFlip>
        </FlipCardFace>
      </FlipCard>
    </Scene>
  );
};
