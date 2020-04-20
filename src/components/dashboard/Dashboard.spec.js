import React from 'react';
import { mount, toJson, shallow } from '../../../tools/config/test/enzyme';
import Dashboard from './Dashboard';

let [
  extractCurrentClient,
  extractchartData,
  extractConcurrentViewers,
] = new Array(3).fill(jest.fn());

function setup() {
  const props = {
    auth: {
      user: {
        lname: 'Ulrich',
      },
    },
    profile: {
      profile: {
        fname: 'Ulrich',
        lname: 'Ekeu',
        email: 'hello@gmail',
        website: 'website.com',
        description: 'Hello Ulrich',
      },
      loading: true,
    },
    chart: {
      cdn: [
        [1234, 123],
        [1234, 123],
        [1234, 123],
      ],
      p2p: [
        [1234, 123],
        [1234, 123],
        [1234, 123],
      ],
      maxSum: 345.5,
      maxCdn: 345.5,
    },
    viewers: {
        concurrence: [
            [1234, 123],
            [1234, 123],
            [1234, 123],
          ]
    },
    extractCurrentClient: extractCurrentClient,
    extractchartData: extractchartData,
    extractConcurrentViewers: extractConcurrentViewers,
  };

  const enzymeWrapper = shallow(<Dashboard {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}
jest.mock('react-redux', () => ({ connect: () => (c) => c }));
jest.mock('../../img/spinner.gif', () => 'mock-bandwith');
const { enzymeWrapper } = setup();

describe('Dashboard Component', () => {
  it('should render correctly without props', () => {
    expect(toJson(enzymeWrapper)).toMatchSnapshot();
  });
});
