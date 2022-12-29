import style from './filterInput.module.css';
import PropTypes from 'prop-types';

export const FilterInput = ({ onFilterInput }) => {
    return <label> Search contact by name
          <input className={style.filterInput} type="text" onInput={onFilterInput} />
        </label>
}

FilterInput.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
}