import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Rewards from "@/pages/rewards";
import {Partner} from "@/models/Partner";
import chefusLogo from "../../../assets/partner-logos/chefus.png";
import purelyLogo from "../../../assets/partner-logos/purely.png";
import saltalkLogo from "../../../assets/partner-logos/saltalk.png";
import tippsyLogo from "../../../assets/partner-logos/tippsy.png";

// Sample Data
const Chefus = new Partner(
    "Chefus",
    "https://www.chefus.com/",
    chefusLogo,
    "Online deliveries",
    "",
   )

const Purely = new Partner(
    "Purely Drinks",
    "https://purelydrinks.com/",
    purelyLogo,
    "Online deliveries",
    "",
)

const Saltalk = new Partner(
    "Saltalk",
    "https://www.saltalk.com/",
    saltalkLogo,
    "Online deliveries",
    "",
)

const Tippsy = new Partner(
    "Tippsy",
    "https://www.tippsysake.com/",
    tippsyLogo,
    "Online deliveries",
    "",
)

const FakePartner = new Partner(
    "Fake",
    "https://www.example.com/",
    null,
    "Online deliveries",
    "",
)


// Store the list of partners here
// Generate them with the constructor
// That way there is a key
const partnerArray = [
   Chefus, Purely, Saltalk, Tippsy
]

jest.mock('next/router', () => require('next-router-mock'));

describe('Rewards', () => {
  afterEach(() => cleanup());

  it('renders rewards component', () => {
    const {container} = render(<Rewards partners={[]}></Rewards>);

    expect(container).toMatchSnapshot();
  });

  it('mocks the useRouter hook', () => {
    // Set the initial url:
    //mockRouter.push("/initial-path");
    
    // Render the component:
    render(<Rewards partners={[]} />);

    // Click the button:
    fireEvent.click(screen.getByRole('button'));
    
    // Ensure the router was updated:
    expect(mockRouter.asPath).toEqual(('/challengerwelcome'));
  });

  it('renders rewards component with partners', () => {
    const {container} = render(<Rewards partners={[Chefus, Purely, Saltalk, Tippsy, FakePartner]}></Rewards>);

    expect(container).toMatchSnapshot();
  });
});