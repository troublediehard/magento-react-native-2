// @flow
import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import type { Category } from '../types/magento';

type Props = {
  id: number,
  query: string,
}

export const useCategoryList = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const { query, id } = props;

  const [runQuery, queryResponse] = useLazyQuery(query);
  const { loading, error, data } = queryResponse;

  // Run the query immediately and every time id changes.
  useEffect(() => {
    runQuery({ variables: { id } });
  }, [id, runQuery]);

  useEffect(() => {
    if (data?.categoryList?.[0]?.children) {
      const filtered = data.categoryList[0].children.filter(
        (category: Category): boolean => (category.children_count > 0 || category.product_count > 0)
      );
      setCategories(filtered);
    }
  }, [data]);

  return {
    childCategories: categories,
    error,
    loading,
  };
};
