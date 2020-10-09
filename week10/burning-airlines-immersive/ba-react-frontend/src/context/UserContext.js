// Context example
import { createContext } from 'react';

//
// const user = {
//   email: 'test@test.com',
//   id: '12345'
// };
//
// https://reactjs.org/docs/context.html#reactcreatecontext

// TODO: QUESTION: When is this 'user' defautl value actually used?
// And what is its relation to the 'value' prop of the Provider?
// const UserContext = createContext(user);

const UserContext = createContext(); // can leave default value blank

export default UserContext;
