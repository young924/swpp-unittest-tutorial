import React from "react";
import { shallow } from 'enzyme';
import Calendar from "./Calendar";

describe('<Calendar />', () => {
    const year = 2021;
    const month = 10;
    const todos = [
        { id: 1, title: 'TODO_TEST_TITLE_1', done: true, year: year, month: 9, date: 3 },
        { id: 2, title: 'TODO_TEST_TITLE_2', done: true, year: year, month: 10, date: 7 },
        { id: 3, title: 'TODO_TEST_TITLE_3', done: true, year: year, month: 11, date: 13 },
    ];

    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    });

    it('should render todos', () => {
        const component = shallow(<Calendar year={year} month={month} todos={todos} />);
        const wrapper = component.find('.todoTitle');
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={year} month={month} todos={todos} clickDone={mockClickDone} />);
        const wrapper = component.find('.todoTitle.done');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
})