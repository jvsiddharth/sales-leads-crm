import {
  type NextFunction,
  type Request,
  type Response,
} from "express";

export function asyncHandler(
  controller: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<unknown>
) {
  return (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    Promise.resolve(
      controller(
        request,
        response,
        next
      )
    ).catch(next);
  };
}