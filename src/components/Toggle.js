import React from 'react';
import './Toggle.css';
import { globals } from '../global';

const Toggle3 = () => {
  const onClick = () => {
    globals.survival = !globals.survival;
  };

  return (
    <div className='menu-toggle'>
      <h2>Endless</h2>
      <svg
        id='toggle'
        onClick={onClick}
        version='1.1'
        className='svg-switch-container'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 500 300'
        xmlSpace='preserve'
      >
        <defs>
          <linearGradient
            id='SVGID_1_'
            gradientUnits='userSpaceOnUse'
            x1={360}
            y1='149.0088'
            x2={360}
            y2='331.0775'
          >
            <stop offset={0} style={{ stopColor: '#636F7C' }} />
            <stop offset={1} style={{ stopColor: '#5A6571' }} />
          </linearGradient>
          <filter
            id='inset-shadow-big-bottom'
            x='-50%'
            y='-30%'
            width='200%'
            height='160%'
          >
            <feOffset dx={0} dy={2} />
            <feGaussianBlur stdDeviation={1} result='offset-blur' />
            <feComposite
              operator='out'
              in='SourceGraphic'
              in2='offset-blur'
              result='inverse'
            />
            <feFlood floodColor='#FFF' floodOpacity={1} result='color' />
            <feComposite
              operator='in'
              in='color'
              in2='inverse'
              result='shadow'
            />
            <feComponentTransfer in='shadow' result='shadow'>
              <feFuncA type='linear' slope='0.5' />
            </feComponentTransfer>
            <feComposite
              operator='over'
              in='shadow'
              in2='SourceGraphic'
              result='final-shadow-1'
            />
            <feOffset dx={0} dy={-4} />
            <feGaussianBlur stdDeviation={2} result='offset-blur' />
            {/* Shadow Blur */}
            <feComposite
              operator='out'
              in='final-shadow-1'
              in2='offset-blur'
              result='inverse'
            />
            <feFlood floodColor='#999' floodOpacity={1} result='color' />
            <feComposite
              operator='in'
              in='color'
              in2='inverse'
              result='shadow'
            />
            <feComponentTransfer in='shadow' result='shadow'>
              <feFuncA type='linear' slope='0.5' />
            </feComponentTransfer>
            <feComposite
              operator='over'
              in='shadow'
              in2='final-shadow-1'
              result='final-shadow-2'
            />
            <feGaussianBlur in='SourceAlpha' stdDeviation={4} result='blur' />
            <feOffset dx={0} dy={3} result='offsetblur' />
            <feComponentTransfer result='shadow1' in='offsetblur'>
              <feFuncA type='linear' slope='0.25' />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in='shadow1' />
              <feMergeNode in='final-shadow-2' />
            </feMerge>
          </filter>
          <filter id='inset-shadow-container'>
            <feOffset dx={0} dy={2} />
            <feGaussianBlur stdDeviation={2} result='offset-blur' />
            {/* Shadow Blur */}
            <feComposite
              operator='out'
              in='SourceGraphic'
              in2='offset-blur'
              result='inverse'
            />
            <feFlood floodColor='#555' floodOpacity={1} result='color' />
            <feComposite
              operator='in'
              in='color'
              in2='inverse'
              result='shadow'
            />
            <feComponentTransfer in='shadow' result='shadow'>
              <feFuncA type='linear' slope={1} />
            </feComponentTransfer>
            <feComposite operator='over' in='shadow' in2='SourceGraphic' />
          </filter>
          <filter id='inset-shadow-container-big'>
            <feOffset dx={0} dy={0} />
            <feGaussianBlur stdDeviation={5} result='offset-blur' />
            <feComposite
              operator='out'
              in='SourceGraphic'
              in2='offset-blur'
              result='inverse'
            />
            <feFlood floodColor='#555' floodOpacity={1} result='color' />
            <feComposite
              operator='in'
              in='color'
              in2='inverse'
              result='shadow'
            />
            <feComponentTransfer in='shadow' result='shadow'>
              <feFuncA type='linear' slope={1} />
            </feComponentTransfer>
            <feComposite operator='over' in='shadow' in2='SourceGraphic' />
          </filter>
          <filter
            id='big-gaussian-blur'
            x='-50%'
            y='-20%'
            width='150%'
            height='150%'
          >
            <feGaussianBlur stdDeviation={25} result='base-blur' />
          </filter>
          <filter id='drop-shadow' x='-10%' y={0} width='150%' height='120%'>
            <feOffset result='offOut' in='SourceGraphic' dx={0} dy={14} />
            <feColorMatrix
              result='matrixOut'
              in='offOut'
              type='matrix'
              values='0.2 0 0 
              0 0 0 0.2 
              0 0 0 0 0 
              0.2 0 0 0 
              0 0 0.5 0'
            />
            <feGaussianBlur result='blurOut' in='matrixOut' stdDeviation={6} />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>
          <filter
            id='drop-shadow-checkbox'
            x='-10%'
            y={0}
            width='120%'
            height='120%'
          >
            <feOffset result='offOut' in='SourceGraphic' dx={0} dy={10} />
            <feColorMatrix
              result='matrixOut'
              in='offOut'
              type='matrix'
              values='0.0 0 0 
              0 0 0 0.0 
              0 0 0 0 0 
              0.0 0 0 0 
              0 0 0.35 0'
            />
            <feGaussianBlur result='blurOut' in='matrixOut' stdDeviation={10} />
            <feBlend in='SourceGraphic' in2='blurOut' mode='normal' />
          </filter>
        </defs>
        <g className='svg-switch' transform='translate(-130 -110)'>
          <g
            id='mild-glow'
            style={{ fill: '#F4847D' }}
            opacity={1}
            filter='url(#big-gaussian-blur)'
          >
            <path
              d='M254.949,330.381l-79.336-79.336c-6.1-6.1-6.1-15.991,0-22.091l79.336-79.336c6.1-6.1,15.991-6.1,22.091,0l79.336,79.336
        c6.1,6.1,6.1,15.991,0,22.091l-79.336,79.336C270.939,336.481,261.049,336.481,254.949,330.381z'
            />
          </g>
          <path
            id='base-outline'
            filter='url(#drop-shadow)'
            style={{ fill: '#F3F3F0' }}
            d='M452.006,140.624H266.328c-0.848,0-1.665,0.132-2.431,0.376c-4.598,0.832-8.878,3.06-12.188,6.37
    l-76.344,76.344c-8.98,8.98-8.98,23.592,0,32.572l76.344,76.344c3.31,3.31,7.59,5.537,12.188,6.37
    c0.767,0.244,1.584,0.376,2.431,0.376h185.678c6.152,0,11.936-2.396,16.286-6.746l76.344-76.344c8.98-8.98,8.98-23.592,0-32.572
    l-76.344-76.344C463.942,143.02,458.158,140.624,452.006,140.624L452.006,140.624z'
          />
          <path
            id='base-container'
            style={{ fill: 'url(#SVGID_1_)' }}
            filter='url(#inset-shadow-container-big)'
            d='M538.979,229.371l-76.344-76.344c-2.935-2.935-6.782-4.403-10.629-4.403H266.328v0.101
    c-3.274,0.363-6.452,1.791-8.962,4.301l-76.344,76.344c-5.87,5.87-5.87,15.388,0,21.258l76.344,76.344
    c2.51,2.51,5.689,3.938,8.962,4.301v0.101h185.678c3.847,0,7.694-1.468,10.629-4.403l76.344-76.344
    C544.849,244.759,544.849,235.241,538.979,229.371z'
          />
          <path
            id='start_container'
            style={{ fill: '#525C6B' }}
            className='position-container'
            filter='url(#inset-shadow-container)'
            d='M257.071,313.013l-64.09-64.09c-4.928-4.928-4.928-12.918,0-17.846
    l64.09-64.09c4.928-4.928,12.918-4.928,17.846,0l64.09,64.09c4.928,4.928,4.928,12.918,0,17.846l-64.09,64.09
    C269.989,317.94,261.999,317.94,257.071,313.013z'
          />
          <path
            id='end_container'
            className='position-container'
            style={{ fill: '#525C6B' }}
            filter='url(#inset-shadow-container)'
            d='M445.083,313.013l-64.09-64.09c-4.928-4.928-4.928-12.918,0-17.846
    l64.09-64.09c4.928-4.928,12.918-4.928,17.846,0l64.09,64.09c4.928,4.928,4.928,12.918,0,17.846l-64.09,64.09
    C458.001,317.94,450.011,317.94,445.083,313.013z'
          />
          <text className='text-label noselect' x={225} y={255}>
            OFF
          </text>
          <text className='text-label noselect' x={430} y={255}>
            ON
          </text>
          <g id='checkbox-off' transform='translate(0)'>
            <path
              id='off-bot-cap'
              style={{ fill: '#F5F3EE' }}
              filter='url(#drop-shadow-checkbox)'
              d='M257.071,313.013l-64.09-64.09c-4.928-4.928-4.928-12.918,0-17.846l64.09-64.09
      c4.928-4.928,12.918-4.928,17.846,0l64.09,64.09c4.928,4.928,4.928,12.918,0,17.846l-64.09,64.09
      C269.989,317.94,261.999,317.94,257.071,313.013z'
            />
            <path
              id='off-color'
              style={{ fill: '#F4847D' }}
              d='M257.942,305.884l-57.832-57.832c-4.447-4.447-4.447-11.656,0-16.103l57.832-57.832
      c4.447-4.447,11.656-4.447,16.103,0l57.832,57.832c4.447,4.447,4.447,11.656,0,16.103l-57.832,57.832
      C269.599,310.331,262.389,310.331,257.942,305.884z'
            />
            <path
              id='off-top-cap'
              style={{ fill: '#FFFFFF' }}
              filter='url(#inset-shadow-big-bottom)'
              d='M259.757,291.032l-44.795-44.795c-3.444-3.444-3.444-9.029,0-12.473
      l44.795-44.795c3.444-3.444,9.029-3.444,12.473,0l44.795,44.795c3.444,3.444,3.444,9.029,0,12.473l-44.795,44.795
      C268.786,294.477,263.202,294.477,259.757,291.032z'
            />
          </g>
          <g id='control-group'>
            <path
              className='control-element'
              id='controlon'
              style={{ fill: 'transparent' }}
              d='M452.006,140.624H266.328c-0.848,0-1.665,0.132-2.431,0.376c-4.598,0.832-8.878,3.06-12.188,6.37 
    l-76.344,76.344c-8.98,8.98-8.98,23.592,0,32.572l76.344,76.344c3.31,3.31,7.59,5.537,12.188,6.37
    c0.767,0.244,1.584,0.376,2.431,0.376h185.678c6.152,0,11.936-2.396,16.286-6.746l76.344-76.344c8.98-8.98,8.98-23.592,0-32.572
    l-76.344-76.344C463.942,143.02,458.158,140.624,452.006,140.624L452.006,140.624z'
            />
            <path
              id='controloff'
              className='control-element'
              transform='translate(0 300)'
              style={{ fill: 'transparent' }}
              d='M452.006,140.624H266.328c-0.848,0-1.665,0.132-2.431,0.376c-4.598,0.832-8.878,3.06-12.188,6.37 
    l-76.344,76.344c-8.98,8.98-8.98,23.592,0,32.572l76.344,76.344c3.31,3.31,7.59,5.537,12.188,6.37
    c0.767,0.244,1.584,0.376,2.431,0.376h185.678c6.152,0,11.936-2.396,16.286-6.746l76.344-76.344c8.98-8.98,8.98-23.592,0-32.572
    l-76.344-76.344C463.942,143.02,458.158,140.624,452.006,140.624L452.006,140.624z'
            />
          </g>
          <animateTransform
            xlinkHref='#controlon'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controlon.click'
            dur='0.01s'
            fill='freeze'
            values='0 0 ; 0 300'
          />
          <animateTransform
            xlinkHref='#controloff'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controlon.click'
            dur='0.01s'
            fill='freeze'
            values='0 300 ; 0 0'
          />
          <animateTransform
            xlinkHref='#controlon'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controloff.click'
            dur='0.01s'
            fill='freeze'
            values='0 300 ; 0 0'
          />
          <animateTransform
            xlinkHref='#controloff'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controloff.click'
            dur='0.01s'
            fill='freeze'
            values='0 0 ; 0 300'
          />
          <animateTransform
            xlinkHref='#checkbox-off'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controlon.click'
            dur='0.3s'
            fill='freeze'
            values='0;-5;200;180;188;'
            keyTimes='0;0.1;0.5; 0.9;1'
          />
          <animateTransform
            xlinkHref='#checkbox-off'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controloff.click'
            dur='0.3s'
            fill='freeze'
            values='188;193;-12; 8; 0 '
            keyTimes='0;0.1;0.5; 0.9;1'
          />
          <animateTransform
            xlinkHref='#mild-glow'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controloff.click'
            dur='0.3s'
            fill='freeze'
            values='188;193;-12; 8; 0 '
            keyTimes='0;0.1;0.5; 0.9;1'
          />
          <animateTransform
            xlinkHref='#mild-glow'
            attributeName='transform'
            attributeType='XML'
            type='translate'
            begin='controlon.click'
            dur='0.3s'
            fill='freeze'
            values='0;-5;200;180;188;'
            keyTimes='0;0.1;0.5; 0.9;1'
          />
          ?&gt;
          <animate
            xlinkHref='#off-color'
            attributeName='fill'
            begin='controlon.click'
            dur='0.4s'
            values='#F4847D;#A3CF5A;'
            keySplines='
                  0.2 0.8 0.2 0.9;'
            calcMode='spline'
            fill='freeze'
          />
          <animate
            xlinkHref='#off-color'
            attributeName='fill'
            begin='controloff.click'
            dur='0.4s'
            values='#A3CF5A;#F4847D;'
            keySplines='
                  0.2 0.8 0.2 0.9;'
            calcMode='spline'
            fill='freeze'
          />
          <animate
            xlinkHref='#big-gaussian-blur'
            attributeName='x'
            begin='controloff.click'
            dur='0.2s'
            values='0;-50%;'
            fill='freeze'
          />
          <animate
            xlinkHref='#big-gaussian-blur'
            attributeName='x'
            begin='controlon.click'
            dur='0.2s'
            values='-50%;0;'
            fill='freeze'
          />
          <animate
            xlinkHref='#mild-glow'
            attributeName='fill'
            begin='controlon.click'
            dur='0.4s'
            values='#F4847D;#A3CF5A;'
            keySplines='
                  0.2 0.8 0.2 0.9;'
            calcMode='spline'
            fill='freeze'
          />
          <animate
            xlinkHref='#mild-glow'
            attributeName='fill'
            begin='controloff.click'
            dur='0.4s'
            values='#A3CF5A;#F4847D;'
            keySplines='
                  0.2 0.8 0.2 0.9;'
            calcMode='spline'
            fill='freeze'
          />
        </g>
      </svg>
    </div>
  );
};

export default Toggle3;
