import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { useDebounce } from 'use-debounce';
import { useState } from 'react';
import { useContractSend } from '@/hooks/useContractWrite';
import { waitForTransaction } from '@wagmi/core';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CreatePoolForm = () => {
  const { address } = useAccount();

  const router = useRouter();

  const [visible, setVisible] = useState(false);
  const [celodevName, setCelodevName] = useState('');
  const [celodevWalletAddress, setCelodevWalletAddress] = useState<string>('');
  const [celodevPaymentCurrency, setCelodevPaymentCurrency] = useState('');
  const [celodevTaskDescription, setCelodevTaskDescription] = useState('');
  const [celodevRewardAmount, setCelodevRewardAmount] = useState<
    string | number
  >(0);

  const [debouncedCelodevName] = useDebounce(celodevName, 500);
  const [debouncedCelodevWalletAddress] = useDebounce(
    celodevWalletAddress,
    500
  );
  const [debouncedCelodevPaymentCurrency] = useDebounce(
    celodevPaymentCurrency,
    500
  );
  const [debouncedCelodevTaskDescription] = useDebounce(
    celodevTaskDescription,
    500
  );
  const [debouncedCelodevRewardAmount] = useDebounce(celodevRewardAmount, 500);
  const [loading, setLoading] = useState('');

  const isComplete =
    celodevName &&
    celodevRewardAmount &&
    celodevWalletAddress &&
    celodevPaymentCurrency &&
    celodevTaskDescription;

  const clearForm = () => {
    setCelodevName('');
    setCelodevRewardAmount(0);
    setCelodevWalletAddress('');
    setCelodevTaskDescription('');
    setCelodevPaymentCurrency('');
  };

  const CelodevRewardAmountInWei = ethers.utils.parseEther(
    `${debouncedCelodevRewardAmount.toString() || 0}`
  );

  const { writeAsync: createCelodev } = useContractSend(
    'captureCelodevDetails',
    [
      debouncedCelodevName,
      debouncedCelodevWalletAddress,
      debouncedCelodevPaymentCurrency,
      debouncedCelodevTaskDescription,
      CelodevRewardAmountInWei,
      address,
    ]
  );

  const handleCreateCelodev = async () => {
    if (!createCelodev) {
      throw 'Failed to create Celodev';
    }
    setLoading('Creating...');
    if (!isComplete) throw new Error('Please fill all fields');
    const { hash: approveHash } = await createCelodev();
    setLoading('Waiting for confirmation...');

    await waitForTransaction({ confirmations: 1, hash: approveHash });

    setVisible(false);
    clearForm();
  };

  const addCelodev = async (e: any) => {
    e.preventDefault();
    try {
      await toast.promise(handleCreateCelodev(), {
        loading: 'Creating Celodev...',
        success: 'Celodev created successfully',
        error: 'Something went wrong. Try again.',
      });
      setTimeout(() => {
        router.refresh();
      }, 10000);
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading('');
    }
  };

  return (
    <div className={'flex flex-row w-full justify-between'}>
      <div>
        <button
          type='button'
          onClick={() => setVisible(true)}
          className='inline-block ml-4 px-6 py-2.5 border-2 border-primary text-neutral-700 font-medium text-md leading-tight rounded-lg shadow-md hover:bg-primary hover:text-white hover:shadow-lg focus:bg-primary focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary active:shadow-lg transition duration-150 ease-in-out'
          data-bs-toggle='modal'
          data-bs-target='#exampleModalCenter'
        >
          Create Pool
        </button>

        {/* Modal */}
        {visible && (
          <div
            className='fixed z-40 overflow-y-auto top-0 w-full left-0'
            id='modal'
          >
            <form onSubmit={addCelodev}>
              <div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                  <div className='absolute inset-0 bg-gray-900 opacity-75' />
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                  &#8203;
                </span>
                <div
                  className='inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  <div className='bg-white flex flex-col space-y-3 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div>
                      <label>Pool Name</label>
                      <input
                        onChange={(e) => {
                          setCelodevName(e.target.value);
                        }}
                        required
                        type='text'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                    <div>
                      <label>Pool Description</label>
                      <input
                        onChange={(e) => {
                          setCelodevWalletAddress(e.target.value);
                        }}
                        required
                        type='text'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                    <div>
                      <label>Maximum No. of Participant</label>
                      <input
                        onChange={(e) => {
                          setCelodevWalletAddress(e.target.value);
                        }}
                        required
                        type='text'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>
                    <div>
                      <label>Contribution Amount</label>
                      <input
                        onChange={(e) => {
                          setCelodevWalletAddress(e.target.value);
                        }}
                        required
                        type='text'
                        className='w-full bg-gray-100 p-2 mt-2 mb-3'
                      />
                    </div>

                    <div className='flex flex-col space-y-1'>
                      <label>Duration per turn</label>
                      <select
                        value={celodevPaymentCurrency}
                        onChange={(e) => {
                          setCelodevPaymentCurrency(e.target.value);
                        }}
                        className='py-2.5'
                      >
                        <option defaultValue='Duration in weeks'>
                          Duration in weeks
                        </option>
                        <option value='1 week'>1</option>
                        <option value='2 weeks'>2</option>
                        <option value='3 weeks'>3</option>
                        <option value='4 weeks'>4</option>
                        <option value='5 weeks'>5</option>
                      </select>
                    </div>
                    <div className='flex flex-col space-y-1'>
                      <label>Restrictions</label>
                      <select
                        value={celodevPaymentCurrency}
                        onChange={(e) => {
                          setCelodevPaymentCurrency(e.target.value);
                        }}
                        className='py-2.5'
                      >
                        <option defaultValue=' Select restriction status'>
                          Select restriction status
                        </option>
                        <option value='true'>True</option>
                        <option value='false'>False</option>
                      </select>
                    </div>
                  </div>
                  <div className='bg-gray-200 px-4 py-3 text-right'>
                    <button
                      type='button'
                      className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'
                      onClick={() => setVisible(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      disabled={!!loading || !isComplete || !createCelodev}
                      className='py-2 px-4 bg-primary text-white rounded hover:primary mr-2'
                    >
                      {loading ? loading : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePoolForm;
