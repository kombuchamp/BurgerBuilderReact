import reducer, { initialState } from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should store the token upon login', () => {
        const testToken = 'test-token';
        const testUserId = 'test-user-id';

        expect(
            reducer(initialState, {
                type: actionTypes.AUTH_SUCCESS,
                payload: {
                    idToken: testToken,
                    userId: testUserId,
                },
            })
        ).toEqual({
            ...initialState,
            idToken: testToken,
            userId: testUserId,
        });
    });
});
