import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
    year: 2021,
    month: 9,
    todos: [
        { id: 1, title: 'TODO_TEST_TITLE_1', done: true, year: 2021, month: 9, date: 3 },
        { id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2021, month: 9, date: 7 },
        { id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2021, month: 9, date: 13 },
    ]
};

const mockStore = getMockStore(stubInitialState);

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyTodo">
                <div className="title" onClick={props.clickDetail}>
                    {props.title}
                </div>
                <button className="doneButton" onClick={props.clickDone} />
                <button className="deleteButton" onClick={props.clickDelete} />
            </div>);
    });
});

describe('<TodoCalendar />', () => {
    let todoCalendar;
    beforeEach(() => {
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TodoCalendar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render TodoCalendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    });

    it('should handle prev month clicks', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('button').at(0);
        expect(wrapper.text()).toEqual(' prev month ')
        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        for (let i = 0; i < 8; i++) {
            wrapper.simulate('click');
            expect(todoCalendarInstance.state.year).toEqual(stubInitialState.year);
            expect(todoCalendarInstance.state.month).toEqual(stubInitialState.month - (i + 1));
        }
        wrapper.simulate('click');
        expect(todoCalendarInstance.state.year).toEqual(stubInitialState.year - 1);
        expect(todoCalendarInstance.state.month).toEqual(12);
    });

    it('should handle next month clicks', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('button').at(1);
        expect(wrapper.text()).toEqual(' next month ');
        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        for (let i = 0; i < 3; i++) {
            wrapper.simulate('click');
            expect(todoCalendarInstance.state.year).toEqual(stubInitialState.year);
            expect(todoCalendarInstance.state.month).toEqual(stubInitialState.month + (i + 1));
        }
        wrapper.simulate('click');
        expect(todoCalendarInstance.state.year).toEqual(stubInitialState.year + 1);
        expect(todoCalendarInstance.state.month).toEqual(1);
    });


});


