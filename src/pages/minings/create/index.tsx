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

import { createMining } from 'apiSdk/minings';
import { miningValidationSchema } from 'validationSchema/minings';
import { ProfitInterface } from 'interfaces/profit';
import { getProfits } from 'apiSdk/profits';
import { MiningInterface } from 'interfaces/mining';

function MiningCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MiningInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMining(values);
      resetForm();
      router.push('/minings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MiningInterface>({
    initialValues: {
      mining_date: new Date(new Date().toDateString()),
      profit_id: (router.query.profit_id as string) ?? null,
    },
    validationSchema: miningValidationSchema,
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
              label: 'Minings',
              link: '/minings',
            },
            {
              label: 'Create Mining',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Mining
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="mining_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Mining Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.mining_date ? new Date(formik.values?.mining_date) : null}
              onChange={(value: Date) => formik.setFieldValue('mining_date', value)}
            />
          </FormControl>
          <AsyncSelect<ProfitInterface>
            formik={formik}
            name={'profit_id'}
            label={'Select Profit'}
            placeholder={'Select Profit'}
            fetcher={getProfits}
            labelField={'percentage_gain'}
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
              onClick={() => router.push('/minings')}
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
    entity: 'mining',
    operation: AccessOperationEnum.CREATE,
  }),
)(MiningCreatePage);
