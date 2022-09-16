import { useState, useEffect, Fragment } from 'react'
import {
  Header,
  Label,
  Layout,
  TextInput,
  SideCard
} from 'components'
import { getData, postData } from 'services'
import produce from 'immer'
import { getInputType, getCurrValue, getDefaultValue } from 'utils'

const Home = () => {
  const [data, setData] = useState<Record<string, any>>({})
  const [selectedData, setSelectedData] = useState<Record<string, any>>({})
  const [open, setOpen] = useState(false)
  const [formType, setFormType] = useState<Record<string, any>[]>([])
  const [sideCardType, setSideCardType] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const data = getData()
    setData(data)

    /**
     * - extract the graph data to formType state to be used as form input structure
     */
    let formType: Record<string, any>[] = []
    Object.keys(data?.graph?.elements).forEach(v => {
      //@ts-ignore
      const props = data?.graph?.elements[v]
      formType.push({name: v, ...props })
    })
    setFormType(formType)
  }, [])

  /**
   * - Take care open side card component when user click button input +
   * - Prepare the initial input form data
   * - Tell the SideCard component that the component should be as creation mode
   */
  const handleNewInputData = () => {
    setOpen(!open)
    setSideCardType('create')
    const initialSelectedData = generateInitialSelectedData()
    setSelectedData(initialSelectedData)
  }

  /**
   * - Generating initial data for form input base on graph object
   */
  const generateInitialSelectedData = () => {
    let obj = { _id: data?.data?.length + 1}
    formType.forEach(v => {
      const key = v.name
      //@ts-ignore
      obj[key] = getDefaultValue(v.props.type, v.props?.descr)
    })
    return obj
  }

  /**
   * 
   * - Handle selected data from table and set as form input data
   * - Tell the SideCard component that the component should be as creation mode
   */
  const handleSelectedData = (data: Record<string, any>) => {
    setOpen(!open)
    setSelectedData(data)
    setSideCardType('edit')
  }

  /**
   * - Close the SideCard component
   * - Clear input form data
   */
  const handleCloseSideCard = () => {
    setOpen(!open)
    clearSelectedData()
  }

  /**
   * 
   * - Listen for form input change
   */
  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (e.target.name === 'createdAt' && value !== '') {
      value = `${value}${new Date().toISOString().substring(10)}`
    }
    setSelectedData({
      ...selectedData, 
      [e.target.name]: value
    })
  }

  /**
   * - Submit both creation and edit 
   */
  const handleSubmit = () => {
    if (formValidation()) return
    postData(selectedData)
    const nextData = produce(data, draft => {
      if (sideCardType === 'create') {
        draft.data.push(selectedData) 
        return
      }
      const index = draft.data.findIndex((v: Record<string, any>) => v._id === selectedData._id)
      draft.data[index] = selectedData
    })
    setData(nextData)
    clearSelectedData()
    setOpen(!open)
    setSideCardType('')
    setError('')
  }

  /**
   * - Validate all input data
   */
  const formValidation = (): boolean => {
    let isError: boolean = false
    Object.keys(selectedData).forEach(v => {
      if (!selectedData[v]) {
        isError = true
        setError('All the input required to filled')
        return
      }
    })
    return isError
  }

  /**
   * - Clear the input form data
   */
  const clearSelectedData = () => {
    setSelectedData({})
  }

  return (
    <Layout>
      <Header>
        <h1 className='text-lg text-textPrimary font-semibold'>
          {data?.title}
        </h1>
      </Header>
      
      <main className='p-4 relative'>
        <button
          className='px-4 py-3 mb-5 w-[150px] bg-blue-500 font-semibold text-white text-sm mt-4 cursor-pointer hover:opacity-80 rounded'
          onClick={handleNewInputData}
        >
          Input +
        </button>
        
        <table className="w-full min-w-[300px] overflow-x-auto">
          <thead className='h-14 bg-gray-200'>
            <tr className='text-sm text-left text-textPrimary font-normal'>
              <th className='px-4'>Name</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody className='px-5 text-sm cursor-pointer bg-white'>
            {data?.data?.map((v: Record<string, any>) => (
              <tr 
                key={v._id}
                className='h-14 hover:bg-gray-100'
                onClick={() => handleSelectedData(v)}
              >
                <td className='px-4'>{v.name}</td>
                <td>{v.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SideCard
          open={open}
          onClose={handleCloseSideCard}
        >
          <form
            className='flex flex-col'
            onSubmit={e => e.preventDefault()}
          >
            {formType.map((v, i) => (
              <Fragment key={i}>
                <Label htmlFor={v.name} value={v.name} />
                <TextInput
                  id={v.name}
                  type={getInputType(v.props.type)}
                  name={v.name}
                  placeholder={v.props.descr}
                  value={getCurrValue(selectedData[v.name], v.props.type)}
                  onChange={handleChangeForm}
                />
              </Fragment>
            ))}

            <div className='text-center'>
              <button
                className={`px-4 py-3 w-[150px] ${sideCardType === 'create' ? 'bg-blue-500' : 'bg-yellow-500'} font-semibold text-white text-sm mt-4 cursor-pointer hover:opacity-80 rounded`}
                onClick={handleSubmit}
              >
                {sideCardType === 'create' ? 'Create' : 'Edit'}
              </button>
            </div>
            
            {error !== '' &&
              <p className='mt-5 text-sm text-red-500 text-center'>{error}</p>
            }
          </form>
        </SideCard>
      </main>
    </Layout>
  )
}

export default Home