import { sum } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import { useDispatch, useSelector } from 'react-redux';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Skeleton,
  Container,
  Typography
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// redux
// import { getProduct, addCart, onGotoStep } from '../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';
import HeaderDashboard from '../components/HeaderDashboard';
import ProductDetailsSumary from '../components/product/ProductDetailsSumary';
import ProductDetailsReview from '../components/product/ProductDetailsReview';
import ProductDetailsCarousel from '../components/product/ProductDetailsCarousel';
import CartWidget from '../components/product/CartWidget';
import { LOGnewVisit } from '../api/metrics';
import { getSingleAsset } from '../api/opensea';
import { PROMOTERS } from '../config';
import { removeUnderscoreAndCapitalize } from '../utils/formatStrings';

const publicIp = require('public-ip');
// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description:
      'A unique handmade collectionable DOBER Living on the Ethereum BlockChain',
    icon: roundVerified
  },
  {
    title: 'Holders Dober Club',
    description:
      'As a DOBER Holder you are part of out distinguished owners club community. Having a vote on important decisions',
    icon: roundVerified
  },
  {
    title: 'Transaction Security',
    description:
      'Clicking buy now will redirect to Opensea platform the most secure TOP NFT platform in the market.',
    icon: roundVerifiedUser
  }
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function EcommerceProductDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const params = useParams();
  const { name } = useParams();

  const checkout = {
    activeStep: 0,
    billing: null,
    cart: [],
    discount: 0,
    shipping: 0,
    subtotal: 0
  };
  const totalItems = sum(checkout.cart.map((item) => item.quantity));
  const error = false;

  const logMetric = async (type) => {
    const ip = await publicIp.v4();
    try {
      LOGnewVisit(ip, params.promoterId, params.tokenId, type);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!PROMOTERS[params.promoterId]) {
      history.push('/404');
    }

    const getNft = async () => {
      setLoading(true);
      const fetchedNft = await getSingleAsset(params.tokenId);

      const product = {
        ...fetchedNft,
        available: 1,
        category: 'Collection',
        colors: ['#000000'],
        buyLink: fetchedNft.permalink,
        cover: fetchedNft.image_url,
        description: `\n<p><strong><small> ON SALE</small></strong></p>\n<p>Buying this DOBER you^re gonna be able to be an important member of out distinguished club and take advantage of it : Use your DOBER as your avatar in our future NFT Play 2 Earn Game | You are given a user and password in out platform to propose your ideas for this project | And much more ! .\n<br /><br />\n<p><strong><small> HOW TO BUY</small></strong></p>\n<p> Click buy now and get redirected to open sea to buy the nft or browse a different DOBER of out Collection.</p>\n<p><strong><small>THIS COLLAB</small></strong></p>\n<p> This NFT is the avatar of ${removeUnderscoreAndCapitalize(
          params.promoterId
        )} , If you want to do a Collab with us let us know on  dobermenclubnft@gmail.com.</p>\n`,
        gender: 'Men',
        id: fetchedNft.id,
        images: [fetchedNft.image_thumbnail_url],
        inventoryType: 'ON SALE',
        name: fetchedNft.name,

        price: 0.08,
        sizes: [1],
        sold: 90079,
        status: 'new',
        totalRating: 5.0,
        totalReview: 60347,
        ratings: [
          { name: '1 Star', starCount: 76985, reviewCount: 14449 },
          { name: '2 Star', starCount: 62252, reviewCount: 20652 },
          { name: '3 Star', starCount: 53480, reviewCount: 2845 },
          { name: '4 Star', starCount: 4993, reviewCount: 69178 },
          { name: '5 Star', starCount: 60748, reviewCount: 2513 }
        ],
        reviews: []
      };
      console.log(product);

      setProduct(product);
      setLoading(false);
    };
    getNft();

    if (process.env.NODE_ENV !== 'development') {
      logMetric('visits');
    }
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddCart = (product) => {
    //  dispatch(addCart(product));
  };

  const handleGotoStep = (step) => {
    //  dispatch(onGotoStep(step));
  };

  return (
    <Page title={`${product.name || ''} | Dobermen Club`}>
      <Container style={{ marginTop: '100px' }}>
        <HeaderDashboard
          heading="DOBER Detail"
          links={[
            { name: 'Home', href: PATH_DASHBOARD.root },
            {
              name: 'Promotions',
              href: PATH_DASHBOARD.root
            },
            { name: name || 'Offers' }
          ]}
        />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  {!loading && <ProductDetailsCarousel product={product} />}
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  {!loading && (
                    <ProductDetailsSumary
                      params={params}
                      logMetric={logMetric}
                      product={product}
                      cart={checkout.cart}
                      onAddCart={handleAddCart}
                      onGotoStep={handleGotoStep}
                    />
                  )}
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box
                    sx={{
                      my: 2,
                      mx: 'auto',
                      maxWidth: 280,
                      textAlign: 'center'
                    }}
                  >
                    <IconWrapperStyle>
                      <Icon icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={handleChangeTab}>
                    <Tab disableRipple value="1" label="Description" />
                    {/*   <Tab
                      disableRipple
                      value="2"
                      label={`Review (${product.reviews?.length})`}
                      sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                    /> */}
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown source={product.description} />
                  </Box>
                </TabPanel>
                <TabPanel value="2">
                  <ProductDetailsReview product={product} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && SkeletonLoad}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}
