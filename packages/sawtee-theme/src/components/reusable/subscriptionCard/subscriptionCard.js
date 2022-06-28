import React from "react";
import { styled } from "frontity";
import { HiMailOpen } from "react-icons/hi";

const SubscriptionCard = () => {
  return (
    <Modal>
      <div className="modal__icon">
        <HiMailOpen size={"90px"} />
      </div>
      <h1 className="modal__heading">Don't miss out on our future issues!</h1>
      <p>
        Would you be interested in receiving our newsletter directly in your
        inbox ?
      </p>
      <span>By subscribing you agree to receiving emails from SAWTEE.</span>
      <div className="email-box">
        <input
          type="text"
          className="email-box__input"
          placeholder="Email Address"
        />
        <button type="button" className="email-box__button">
          <i className="ion-paper-airplane"></i>
        </button>
      </div>
    </Modal>
  );
};

export default SubscriptionCard;

const Modal = styled.div`
  background: white;
  color: black;
  width: 100%;
  border-radius: 15px;
  text-align: center;
  padding: 4rem;
  backdrop-filter: blur(5px);
  position: relative;
  margin: 3rem 0;

  & .modal__icon {
    display: flex;
    justify-content: center;
  }

  & .modal__heading {
    text-transform: uppercase;
    font-size: 2.8rem;
    color: black;
    margin-top: 3rem;
  }

  p {
    font-size: 1.5rem;
  }

  span {
    font-style: italic;
    letter-spacing: 0.1rem;
    font-size: 12px;
  }

  .email-box {
    position: absolute;
    bottom: -2rem;
    left: 50%;
    margin-left: -20rem;
    width: 40rem;

    & .email-box__input {
      color: lighten(black, 20%);
      display: block;
      width: 100%;
      height: 4rem;
      border-radius: 15px;
      border: 1px solid #000;
      font-size: 1.4rem;
      padding: 1rem;
      background-color: white;
      &:focus {
        outline: none;
      }
    }

    & .email-box__button {
      appearance: none;
      border: none;
      background: transparent;
      font-size: 2rem;
      position: absolute;
      color: black;
      right: 0.8rem;
      top: 0.8rem;
      padding: 0;

      &:hover,
      &:focus {
        color: darken(black, 20%);
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .modal {
      width: 30rem;
      &__icon {
        padding: 3rem 6rem 0 6rem;
        border-radius: 50%;
      }
    }

    .email-box {
      margin-left: -12.5rem;
      width: 25rem;
    }
  }
`;
