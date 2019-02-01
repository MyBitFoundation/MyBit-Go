import styled from 'styled-components';

const StyledExplore = styled.div`
  margin-top: 25px;
  margin-bottom: 50px;

  .filters{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    position: relative;

    &--is-categories{
      position: absolute;
    }

    &--is-switch{
      position: relative;
      left: 100%;
      transform: translate(-100%, 0%);
      padding-right: 10px;

      span{
        font-family: Roboto;
        font-size: 14px;
        text-align: right;
        color: #4a4a4a;
        margin-right: 10px;
        position: relative;
      }

      .ant-switch span{
        color: white;
      }
    }
  }

  &__no-results{
    font-size: 25px;
    text-align: center;
    margin-top: 150px;
  }

  &__pagination{
    position: relative;
    position: absolute;
    top: 100%;
    left: 15px;
  }

  &__container{
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    padding: 0;
  }

  &__category
    {
      margin: 0px 10px 20px 15px;
      padding: 0px;
      height: 310px;
      text-decoration: none;
      width: 100%;
      height: 240px;

      &-name{
        width: 95%;
        margin: 0 auto;
        text-align: center;
        font-size: 36px;
        line-height: 42px;
        font-family: 'Gilroy';
        font-weight: 900;
        color: #ffffff;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        position: relative;
        padding: 0px 10px;
      }
    }

    &__image-container{
      width: 100%;
      margin: 0 auto;
      height: 240px;
      background-size: cover;
      background-position: center;
      cursor: pointer;
      display: flex;
      align-items: center;
      background-color: linear-gradient(#24f281,#0083ff) 1;
      border: 6px solid white;
    }

    &__image-container:hover {
      border-style: solid;
      border-width: 6px;
      border-image: linear-gradient(#24f281,#0083ff) 1;
      cursor: pointer;
    }
}`

export default StyledExplore;
