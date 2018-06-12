import { css } from 'glamor';

const imageContainer = css({
}).toString();

const metaContainer = css({
}).toString();

const buttonContainer = css({
  textAlign: 'right',
}).toString();

const headline = css({
  fontWeight: 500,
}).toString();

const availability = css({
  fontSize: '0.75rem',
}).toString();

const price = css({
  justifyContent: 'flex-end',
}).toString();

const priceStriked = css({
  fontSize: '0.875rem',
}).toString();

const priceInfo = css({
  fontSize: '0.75rem',
}).toString();

export default {
  imageContainer,
  metaContainer,
  buttonContainer,
  headline,
  availability,
  price,
  priceStriked,
  priceInfo,
};
