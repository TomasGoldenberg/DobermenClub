import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, Typography, Button } from '@material-ui/core';
import {
  alpha,
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { isFuture } from '../../utils/formatDate';

const NextMilestone = () => {
  const [countDown, setCountDown] = useState('02/23:00:19');
  const [isInTheFuture, setIsInTheFuture] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  const color = '#FF00E1';
  useEffect(() => {
    const parseTime = (time) => {
      const parsedTime = Math.floor(time);
      if (parsedTime.toString().length === 1) {
        return `0${parsedTime}`;
      }
      return parsedTime.toString();
    };

    // DATE
    const releaseDay = new Date(2021, 11, 2, '18', '00');
    const isInTheFuture = isFuture(releaseDay);
    if (isInTheFuture) {
      setIsInTheFuture(true);
    }

    const today = new Date();
    const diffInDays = parseTime(getDifferenceInDays(releaseDay, today));
    const diffInHours = parseTime(
      getDifferenceInHours(releaseDay, today, diffInDays)
    );

    const diffInMinutes = parseTime(
      getDifferenceInMinutes(
        releaseDay,
        new Date(),
        Number(diffInDays),
        Number(diffInHours)
      )
    );

    const diffInSeconds = parseTime(
      getDifferenceInSeconds(
        releaseDay,
        new Date(),
        Number(diffInDays),
        Number(diffInHours),
        Number(diffInMinutes)
      )
    );
    setCountDown(
      `${diffInDays}/${diffInHours}:${diffInMinutes}:${diffInSeconds}`
    );

    function getDifferenceInDays(date1, date2) {
      const diffInMs = Math.abs(date2 - date1);
      return diffInMs / (1000 * 60 * 60 * 24);
    }

    function getDifferenceInHours(date1, date2, days) {
      const diffInMs = Math.abs(date2 - date1);
      const totalHours = diffInMs / (1000 * 60 * 60);

      const hours = totalHours - 24 * Number(days);
      return hours;
    }

    function getDifferenceInMinutes(date1, date2, days, hours) {
      const diffInMs = Math.abs(date2 - date1);
      const totalMinutes = diffInMs / (1000 * 60);

      const hoursToSubstract = days * 24 + hours;
      return totalMinutes - hoursToSubstract * 60;
    }

    function getDifferenceInSeconds(date1, date2, days, hours, minutes) {
      const diffInMs = Math.abs(date2 - date1);
      const totalSeconds = diffInMs / 1000;

      const hoursToSubstract = days * 24 + hours;
      const minutesToSubstract = hoursToSubstract * 60 + minutes;
      const secondsToSubstract = minutesToSubstract * 60;
      return totalSeconds - secondsToSubstract;
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      let changeHour = false;
      let changeMinute = false;
      let time;
      setCountDown((prevState) => (time = prevState));

      if (!time) {
        return () => {};
      }
      const dayIndex = time.indexOf('/') + 1;
      let day = time;
      day = day.slice(0, dayIndex);
      time = time.slice(dayIndex, time.length);
      console.log(time);
      const hours = Number(time.slice(0, 2));
      const minutes = Number(time.slice(3, 5));
      const seconds = Number(time.slice(-2));
      let hoursString = time.slice(0, 2);
      let minutesString = time.slice(3, 5);
      let secondsString = time.slice(-2);

      const handleZeros = (number) => {
        let string = number.toString();
        const isLessThanTen = string.length === 1;
        string = isLessThanTen ? `0${string}` : string;
        return string;
      };

      if (
        minutesString === '00' &&
        secondsString === '00' &&
        hoursString === '00'
      ) {
        hoursString = '23';
        changeHour = true;
        minutesString = '59';
        changeMinute = true;
        secondsString = '59';
      }

      if (minutesString === '00' && secondsString === '00' && !changeHour) {
        hoursString = handleZeros(hours - 1);
        changeHour = true;
        minutesString = '59';
        changeMinute = true;
        secondsString = '59';
      }

      if (secondsString === '00' && !changeHour) {
        minutesString = handleZeros(minutes - 1);
        secondsString = '59';
        changeMinute = true;
      }

      if (!changeMinute && !changeHour) {
        secondsString = handleZeros(seconds - 1);
      }

      const newTime = `${day}${hoursString}:${minutesString}:${secondsString}`;

      setCountDown(newTime);
    }, 1000);
  }, []);

  return (
    <Box>
      <img
        src={
          !isDesktop
            ? 'https://i.ibb.co/82fJBsR/whiteboy-1-Conflicted-copy-from-i-Pad-Air-4th-generation-on-2021-11-24-20-31-53-1-01-bs-SMOKE3.png'
            : 'https://i.ibb.co/Vq7bRNc/IMG-0288.jpg'
        }
        alt="girls"
      />
      <Box style={{ marginTop: '-150px' }}>
        {isInTheFuture ? (
          <>
            <Box>
              <Typography
                style={{
                  fontSize: isDesktop ? '21px' : '14px',
                  paddingLeft: isDesktop ? '150px' : '38px'
                }}
              >
                DAYS - HOURS - MINUTES - SECONDS
              </Typography>
            </Box>
            <Box>
              <Typography
                variant={isDesktop ? 'h1' : 'h1'}
                style={{ color, paddingLeft: isDesktop ? '150px' : '44px' }}
              >
                {countDown.replace('/', '-')}
              </Typography>
            </Box>
          </>
        ) : (
          <Box
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              style={{
                background: color,
                marginTop: '60px',
                marginRight: isDesktop ? '600px' : '0px'
              }}
              variant="filled"
            >
              Check it out !
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NextMilestone;
