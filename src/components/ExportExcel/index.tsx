import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { LabelKeyObject } from 'react-csv/components/CommonPropTypes';
import { CSVLink } from 'react-csv';

export default function Component({ headers, data }: {
  headers: LabelKeyObject[];
  data: object[];
}) {
  return (
    <CSVLink
      data={data}
      headers={headers}
      filename={'newReportBarangs.csv'}
      separator={';'}
      enclosingCharacter={'"'}
    >
      <button
        className='
            flex items-center justify-center w-full bg-indigo-500 text-white font-semibold rounded-lg px-5 py-2.5 mt-5
            transition-all hover:bg-indigo md:w-auto md:mr-5 md:mt-0'
      >
        <FontAwesomeIcon icon={faFileLines} size='lg' className='mr-3.5' />
        Export Excel
      </button>
    </CSVLink>
  );
}