import React from 'react';
import Background from '../assets/images/MaskGroup.png';
import 'react-bootstrap';
import './../HomePage/HomePageInfo.scss';

export default function LandingPageInfo() {
	const bodyStyle = {
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
		backgroundPosition: '50% 75%',
	};

	const divStyle = {
		background: 'rgba(20, 42, 56, 0.88)',
		padding: '20px 40px',
		borderTop: '5px solid var(--secondary)',
		borderBottom: '5px solid var(--secondary)',
	};

	return (
		<div style={bodyStyle}>
			<div style={divStyle}>
				<p className="bebas-neue secondary-col">
					Take the 8by8 challenge
				</p>
				<p className="montserrat tertiary-col">
					Asian American Pacific Islanders (AAPI)
					have one of the lowest voter turnout and
					are underrepresented in elected office.
					You can help us make a change.
				</p>
				<p className="montserrat white-col border-text">
					#StopAsianHate at the ballot box
				</p>
				<p className="bebas-neue white-col">
					Invite
					<span className="secondary-col">
						{' '}
						8{' '}
					</span>
					of your friends to register to vote in
					<span className="secondary-col">
						{' '}
						8{' '}
					</span>
					days. <br /> Earn rewards from local
					AAPI-owned restaurants.
				</p>
			</div>
		</div>
	);
}
