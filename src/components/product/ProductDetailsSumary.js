import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useHistory } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';

import { useFormik, Form, FormikProvider, useField } from 'formik';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Chip,
  Button,
  Rating,
  Tooltip,
  Divider,
  Avatar,
  Typography,
  FormHelperText
} from '@material-ui/core';
// routes
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import InstagramIcon from '@mui/icons-material/Instagram';
import FlashOnIcon from '@mui/icons-material/FlashOn';

import { PATH_DASHBOARD } from '../../routes/paths';
import { PROMOTERS, NFTS } from '../../config';
// utils
import { fShortenNumber, fCurrency } from '../../utils/formatNumber';
import { removeUnderscoreAndCapitalize } from '../../utils/formatStrings';
//
import { MIconButton, MButton } from '../@material-extend';
import Label from '../Label';
import { getNftRarety, getNftTraitType } from '../../utils/opensea';
import ETHIcon from '../ETHIcon';
// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/dobermenclub.nft/',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },

  {
    name: 'Twitter',
    link: 'https://twitter.com/Thedobermenclub',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  // eslint-disable-next-line react/prop-types
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

ProductDetailsSumary.propTypes = {
  product: PropTypes.object,
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func
};

export default function ProductDetailsSumary({
  cart,
  product,
  onAddCart,
  onGotoStep,
  params,
  logMetric,
  ...other
}) {
  const theme = useTheme();
  const history = useHistory();
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    buyLink,
    available,
    priceSale = NFTS[name].originalPrice,
    totalRating,
    totalReview,
    inventoryType
  } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);
  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >=
    available;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id,
      name,
      cover,
      available,
      price,
      color: '#000',
      size: '1',
      quantity: available < 1 ? 0 : 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: values.price * values.quantity
          });
        }
        setSubmitting(false);
        onGotoStep(0);
        history.push(PATH_DASHBOARD.eCommerce.checkout);
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  return (
    <RootStyle {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px'
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Label
                variant="ghost"
                color="success"
                sx={{ textTransform: 'uppercase' }}
              >
                {sentenceCase(inventoryType)}
              </Label>
              {window.screen.width > 600 && (
                <Typography
                  variant="overline"
                  sx={{
                    mt: 2,
                    mb: 1,
                    pb: 1,
                    ml: 3,
                    display: 'block',
                    color: status === 'sale' ? 'error.main' : 'info.main'
                  }}
                >
                  {status}
                </Typography>
              )}
            </Box>

            <Rating value={totalRating} precision={0.1} readOnly />
          </Box>

          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="h5" paragraph>
              {name}
            </Typography>

            <Typography
              variant="h4"
              sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
            >
              &nbsp; <ETHIcon />
              {NFTS[name].price}
            </Typography>
          </Box>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box
            sx={{
              my: 3,
              mb: 5,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Rarety
            </Typography>
            <Chip
              label={getNftRarety(product.traits)}
              variant="outlined"
              color="primary"
              icon={<LocalFireDepartmentIcon />}
            />
          </Box>
          <Box
            sx={{
              my: 3,
              mb: 5,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Powers
            </Typography>
            <Box
              style={{
                display: 'flex',
                flexDirection: window.screen.width < 600 ? 'column' : 'row',
                flexWrap: window.screen.width < 600 ? 'no-wrap' : 'wrap',
                justifyContent: ' space-around'
              }}
            >
              {getNftTraitType(product.traits, 'POWER').map((power) => (
                <Chip
                  key={power}
                  style={{ marginTop: '5px' }}
                  label={power.value}
                  variant="outlined"
                  color="error"
                  icon={<FlashOnIcon />}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              my: 3,
              mb: 5,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Accessories
            </Typography>
            {getNftTraitType(product.traits, 'ACCESSORIES').map((power) => (
              <Chip
                key={power}
                label={power.value}
                variant="outlined"
                color="secondary"
                icon={<FlashOnIcon />}
              />
            ))}
          </Box>
          <Box
            sx={{
              my: 3,
              mb: 5,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Promoter ID
            </Typography>
            <Chip
              label={removeUnderscoreAndCapitalize(params.promoterId)}
              variant="outlined"
              color="warning"
              onClick={() => {
                window.open(PROMOTERS[params.promoterId].socialLink);
              }}
              style={{ cursor: 'pointer' }}
              icon={<InstagramIcon />}
            />
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Quantity
            </Typography>

            <div>
              <Incrementer name="quantity" available={available} />
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: 'block',
                  textAlign: 'right',
                  color: 'text.secondary'
                }}
              >
                Available: {available}
              </Typography>

              <FormHelperText error>
                {touched.quantity && errors.quantity}
              </FormHelperText>
            </div>
          </Box>

          <Divider
            sx={{
              borderStyle: 'dashed'
            }}
          />

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              {/*  <Grid item xs={12} sm={6}>
                <MButton
                  fullWidth
                  disabled={isMaxQuantity}
                  size="large"
                  type="button"
                  color="warning"
                  variant="contained"
                  startIcon={<Icon icon={roundAddShoppingCart} />}
                  onClick={handleAddCart}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Add to Cart
                </MButton>
              </Grid> */}

              <Grid item xs={12} sm={12}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  onClick={() => {
                    logMetric('buy_attempt');
                    window.open(buyLink);
                  }}
                  variant="contained"
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {SOCIALS.map((social) => {
              const { icon } = social;
              return (
                <Tooltip
                  key={social.name}
                  title={social.name}
                  onClick={() => {
                    window.open(social.link);
                  }}
                >
                  <MIconButton>{icon}</MIconButton>
                </Tooltip>
              );
            })}
          </Box>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
