import { Either, failure, success } from '../either'
import { Optional } from '../types/optional'
import { InvalidPaginationParamsError } from './errors/invalid-pagination-params-error'

interface PaginationParamsProps {
  pageNumber: number
  itemsPerPage: number
}

export class PaginationParams {
  private _pageNumber: number
  private _itemsPerPage: number

  get pageNumber() {
    return this._pageNumber
  }

  get itemsPerPage() {
    return this._itemsPerPage
  }

  static create(
    props: Optional<PaginationParamsProps, 'itemsPerPage' | 'pageNumber'>,
  ): Either<InvalidPaginationParamsError, PaginationParams> {
    if (props.itemsPerPage && props?.itemsPerPage <= 0) {
      return failure(new InvalidPaginationParamsError())
    }

    if (props.pageNumber && props?.pageNumber < 0) {
      return failure(new InvalidPaginationParamsError())
    }

    const paginationParams = new PaginationParams({
      itemsPerPage: props.itemsPerPage ?? 20,
      pageNumber: props.pageNumber ?? 0,
    })

    return success(paginationParams)
  }

  private constructor(props: PaginationParamsProps) {
    this._itemsPerPage = props.itemsPerPage ?? 20
    this._pageNumber = props.pageNumber ?? 0
  }
}
