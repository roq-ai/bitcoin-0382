import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createProfit } from 'apiSdk/profits';
import { profitValidationSchema } from 'validationSchema/profits';
import { DepositInterface } from 'interfaces/deposit';
import { getDeposits } from 'apiSdk/deposits';
import { ProfitInterface } from 'interfaces/profit';

function ProfitCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProfitInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProfit(values);
      resetForm();
      router.push('/profits');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProfitInterface>({
    initialValues: {
      percentage_gain: 0,
      deposit_id: (router.query.deposit_id as string) ?? null,
    },
    validationSchema: profitValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Profits',
              link: '/profits',
            },
            {
              label: 'Create Profit',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Profit
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Percentage Gain"
            formControlProps={{
              id: 'percentage_gain',
              isInvalid: !!formik.errors?.percentage_gain,
            }}
            name="percentage_gain"
            error={formik.errors?.percentage_gain}
            value={formik.values?.percentage_gain}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('percentage_gain', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<DepositInterface>
            formik={formik}
            name={'deposit_id'}
            label={'Select Deposit'}
            placeholder={'Select Deposit'}
            fetcher={getDeposits}
            labelField={'currency'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/profits')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'profit',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProfitCreatePage);
