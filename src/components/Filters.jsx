import React from 'react';
import styled from 'styled-components';
import { useFilterContext } from '../context/filter_context';
import { getUniqueValues } from '../utils/helpers';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_FILTERS, UPDATE_FILTERS } from '../actions';
import { debounce } from 'debounce';

const Filters = () => {
    const { filters, all_products } = useSelector(
        (state) => state.filter_reducer
    );
    const dispatch = useDispatch();
    const updateFilterText = debounce((e) => {
        let { name, value } = e.target;
        dispatch({
            type: UPDATE_FILTERS,
            payload: { name, value }
        });
    }, 1000);
    const updateFilter = (e) => {
        let { name, value } = e.target;
        if (name === 'category') {
            value = e.target.textContent;
        }
        if (name === 'color') {
            value = e.target.dataset.color;
        }
        if (name === 'price') {
            value = Number(value);
        }
        if (name === 'shipping') {
            value = e.target.checked;
        }
        dispatch({
            type: UPDATE_FILTERS,
            payload: { name, value }
        });
    };
    const clearFilters = () => {
        dispatch({
            type: CLEAR_FILTERS
        });
    };
    const categories = getUniqueValues(all_products, 'category');
    const colors = getUniqueValues(all_products, 'colors');
    const companies = getUniqueValues(all_products, 'company');
    return (
        <Wrapper>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div className="form-control">
                    <input
                        type="text"
                        name="text"
                        placeholder="search"
                        text={filters.text}
                        onChange={updateFilterText}
                        className="search-input"
                    />
                </div>
                <div className="form-control">
                    <h5>category</h5>
                    <div>
                        {categories.map((cate, index) => {
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    name="category"
                                    onClick={updateFilter}
                                    className={`${
                                        cate.toLowerCase() === filters.category
                                            ? 'active'
                                            : null
                                    }`}
                                >
                                    {cate}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="form-control">
                    <h5>company</h5>
                    <select
                        name="company"
                        className="company"
                        onChange={updateFilter}
                        value={filters.company}
                    >
                        {companies.map((comp, index) => {
                            return (
                                <option key={index} value={comp}>
                                    {comp}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="form-control">
                    <h5>colors</h5>
                    <div className="colors">
                        {colors.map((color, index) => {
                            if (color === 'all') {
                                return (
                                    <button
                                        name="color"
                                        onClick={updateFilter}
                                        data-color="all"
                                        key={index}
                                        className={`${
                                            filters.color === 'all'
                                                ? 'all-btn active'
                                                : 'all-btn'
                                        }`}
                                    >
                                        all
                                    </button>
                                );
                            }
                            return (
                                <button
                                    key={index}
                                    name="color"
                                    style={{ backgroundColor: color }}
                                    className={`${
                                        color === filters.color
                                            ? 'active color-btn'
                                            : 'color-btn'
                                    }`}
                                    onClick={updateFilter}
                                    data-color={color}
                                >
                                    {color === filters.color ? (
                                        <FaCheck></FaCheck>
                                    ) : null}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="form-control">
                    <h5>price</h5>
                    <p className="price">${filters.price}</p>
                    <input
                        type="range"
                        name="price"
                        onChange={updateFilter}
                        min={filters.min_price}
                        max={filters.max_price}
                        value={filters.price}
                    />
                </div>
                <div className="form-control shipping">
                    <label htmlFor="shipping">free shipping</label>
                    <input
                        type="checkbox"
                        name="shipping"
                        id="shipping"
                        onChange={updateFilter}
                        checked={filters.shipping}
                    />
                </div>
            </form>
            <button type="button" className="clear-btn" onClick={clearFilters}>
                clear filters
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .form-control {
        margin-bottom: 1.25rem;
        h5 {
            margin-bottom: 0.5rem;
        }
    }
    .search-input {
        padding: 0.5rem;
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        letter-spacing: var(--spacing);
    }
    .search-input::placeholder {
        text-transform: capitalize;
    }

    button {
        display: block;
        margin: 0.25em 0;
        padding: 0.25rem 0;
        text-transform: capitalize;
        background: transparent;
        border: none;
        border-bottom: 1px solid transparent;
        letter-spacing: var(--spacing);
        color: var(--clr-grey-5);
        cursor: pointer;
    }
    .active {
        border-color: var(--clr-grey-5);
    }
    .company {
        background: var(--clr-grey-10);
        border-radius: var(--radius);
        border-color: transparent;
        padding: 0.25rem;
        text-transform: capitalize;
    }
    .colors {
        display: flex;
        align-items: center;
    }
    .color-btn {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background: #222;
        margin-right: 0.5rem;
        border: none;
        cursor: pointer;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 0.5rem;
            color: var(--clr-white);
        }
    }
    .all-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
        opacity: 0.5;
    }
    .active {
        opacity: 1;
    }
    .all-btn .active {
        text-decoration: underline;
    }
    .price {
        margin-bottom: 0.25rem;
    }
    .shipping {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        text-transform: capitalize;
        column-gap: 0.5rem;
        font-size: 1rem;
    }
    .clear-btn {
        background: var(--clr-red-dark);
        color: var(--clr-white);
        padding: 0.25rem 0.5rem;
        border-radius: var(--radius);
    }
    @media (min-width: 768px) {
        .content {
            position: sticky;
            top: 1rem;
        }
    }
`;

export default Filters;
