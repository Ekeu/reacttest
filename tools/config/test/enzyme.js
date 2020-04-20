import Enzyme from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import 'core-js/stable'
import 'regenerator-runtime/runtime';

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;
export { shallow, mount, toJson }