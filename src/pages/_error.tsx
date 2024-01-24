import { Footer } from '@/components/Footer'
import { Button } from '@nextui-org/button'
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'

interface ErrorProps {
  statusCode: number
}

const NotFound: React.FC = () => (
  <>
    <p className='mt-2'>Az keresett oldal nem található.</p>
    <p className='mt-8 text-center'>
      <Button color='primary' onPress={() => (window.location.href = '/')}>
        Vissza
      </Button>
    </p>
  </>
)

const Unexpected: React.FC = () => (
  <>
    <p className='mt-2'>Váratlan hiba történt.</p>
    <p className='mt-8 text-center'>
      <Button color='primary' onPress={() => (window.location.href = '/')}>
        Vissza
      </Button>
    </p>
  </>
)

const ErrorPage: React.FC<ErrorProps> = ({ statusCode }) => {
  return (
    <>
      <main className='dark:bg-[#121212] text-foreground bg-background py-5'>
        <h1 className='text-7xl font-bold text-[#4f81fe] text-center mt-16'>
          {statusCode}
        </h1>
        <div className='flex min-h-screen flex-col items-center justify-between'>
          <div className='container mx-auto'>
            <div className='flex flex-col items-center justify-center'>
              <div className='mt-5 mb-3'>
                <div className='text-2xl font-semibold text-gray-600'>
                  {(() => {
                    switch (statusCode) {
                      case 404:
                        return <NotFound />
                      default:
                        return <Unexpected />
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<ErrorProps> = async (
  context: GetServerSidePropsContext
) => ({
  props: {
    statusCode: context.res ? context.res.statusCode : 404,
  },
})

export default ErrorPage
