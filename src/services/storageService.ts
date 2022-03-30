/* eslint-disable no-useless-catch */ /* eslint-disable prettier/prettier */

import {GRAPHQL_AUTH_MODE} from '@aws-amplify/api-graphql';
import {API} from 'aws-amplify';
import {getPresignedUploadUrl} from '../graphql/queries';
import {
  GetPresignedUploadUrlQuery,
  PresignedUploadInput,
} from '../types/apiTypes';
import {ExtractType} from '../types/extractApiTypes';

export type GetPresignedUrlResponse = ExtractType<GetPresignedUploadUrlQuery>;

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getBlob = async (fileUri: any) => {
  const resp = await fetch(fileUri);
  const imageBody = await resp.blob();
  return imageBody;
};

export const uploadImageNew = async (
  uploadUrl: string,
  data: any,
  type: any,
) => {
  const imageBody = await getBlob(data);

  return fetch(uploadUrl, {
    method: 'PUT',
    body: imageBody,
    headers: {
      'Content-Type': `image/${type}`,
    },
  });
};

// export const getS3presignedURL = async (
//   key: string,
//   type: string,
//   //   username: string,
// ): Promise<string | null> => {
//   const {data} = (await API.graphql({
//     query: getPresignedUploadUrl,
//     variables: {presignedUploadInput: {key, type}},
//     authMode: GRAPHQL_AUTH_MODE.API_KEY,
//   })) as {data: GetPresignedUrlResponse};
//   return data;
// };

export const getS3presignedURL = async (
  presignedUploadInput: PresignedUploadInput,
) => {
  try {
    const {data} = (await API.graphql({
      query: getPresignedUploadUrl,
      variables: {presignedUploadInput},
      authMode: GRAPHQL_AUTH_MODE.API_KEY,
    })) as {
      data: GetPresignedUrlResponse;
    };
    return data.getPresignedUploadUrl;
  } catch (error) {
    throw error;
  }
};
