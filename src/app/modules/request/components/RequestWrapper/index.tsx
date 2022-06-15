import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'app/store';
import { selectError, selectIsLoading } from 'app/modules/request/selectors';
import { setError } from 'app/modules/request/actions';

type TProps = {
    children: ReactNode;
    name: keyof TRootState;
}

export const RequestWrapper: React.FC<TProps> = ({ children, name }) => {
    const dispatch = useDispatch();

    const isLoading = useSelector<TRootState, boolean>(
        (state) => selectIsLoading(name, state)
    );

    const error = useSelector<TRootState, string>(
        (state) => selectError(name, state)
    );

    useEffect(() => {
        if (!error) {
            return;
        }

        const timeOutId = setTimeout(() => {
            dispatch(setError({
                moduleName: name,
                payload: ''
            }))
        }, 5000);

        return () => clearTimeout(timeOutId);
    }, [error]);

    return <>
        {isLoading ? <div>Loading...</div> : children}
    </>
};
